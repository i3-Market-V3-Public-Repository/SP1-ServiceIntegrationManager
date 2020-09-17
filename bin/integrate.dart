import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:recase/recase.dart';
import 'package:validators/validators.dart';

void main(List<String> arguments) async {
  welcome();
  final projectPath = askBasePath();
  final serviceName = askServiceNameAndOverwrite(projectPath);
  final specFile = await getSpec(projectPath, serviceName);
  await integrateService(projectPath, serviceName, specFile);
}

void welcome() {
  print('Welcome to the i3-Market Service Integration Manager');
}

String askBasePath() {
  print('Enter the path of the backplane project [.]:');
  final path = stdin.readLineSync();
  return path.isEmpty ? '.' : path;
}

String askServiceNameAndOverwrite(String projectPath) {
  print('Enter the name of the service to be integrated:');
  final serviceName = stdin.readLineSync().paramCase;
  final integratedServicesDirectory = Directory('$projectPath/integrated_services');
  if (!integratedServicesDirectory.existsSync()) {
    integratedServicesDirectory.createSync();
  }
  final specFile = getFile(integratedServicesDirectory, serviceName);
  if (specFile != null) {
    overwriteService(specFile, projectPath, serviceName);
  }
  return serviceName;
}

void overwriteService(File specFile, String projectPath, String serviceName) {
  print('A service with this name is already integrated.');
  print('Do you want to overwrite it? [y/N]: ');
  final confirmation = {'y', 'yes'}.contains(stdin.readLineSync().toLowerCase());
  if (confirmation) {
    specFile.deleteSync();
    Directory('$projectPath/src/controllers/$serviceName').deleteSync(recursive: true);
    Directory('$projectPath/src/datasources/$serviceName').deleteSync(recursive: true);
    Directory('$projectPath/src/models/$serviceName').deleteSync(recursive: true);
    Directory('$projectPath/src/repositories/$serviceName').deleteSync(recursive: true);
    Directory('$projectPath/src/services/$serviceName').deleteSync(recursive: true);
  } else {
    exit(1);
  }
}

File getFile(Directory directory, String filename) {
  for (final file in directory.listSync()) {
    if (basenameWithoutExtension(file.path) == filename) return file;
  }
  return null;
}

Future<File> getSpec(String projectPath, String serviceName) async {
  File specFile;
  do {
    print('Enter the OpenAPI spec url or file path:');
    final specPath = stdin.readLineSync();
    if (isURL(specPath)) {
      final content = await downloadContent(specPath);
      if (content != null) {
        final filename =
            '$projectPath/integrated_services/$serviceName.${isJSON(content) ? 'json' : 'yaml'}';
        specFile = File(filename)
          ..createSync()
          ..writeAsStringSync(content);
      }
    } else {
      final tempFile = File(specPath);
      if (tempFile.existsSync()) {
        final fileExtension = extension(tempFile.path);
        specFile = tempFile.copySync('$projectPath/integrated_services/$serviceName$fileExtension');
      } else {
        print('File not found');
      }
    }
  } while (specFile == null);
  return specFile;
}

Future<String> downloadContent(String url) async {
  final client = http.Client();
  try {
    final req = await client.get(Uri.parse(url));
    final content = utf8.decode(req.bodyBytes);
    return content;
  } on Exception {
    print('Could not download file from url');
    return null;
  }
}

void integrateService(String projectPath, String serviceName, File specFile) {
  createServiceDirectories(projectPath, serviceName);
  String output = runServiceCreation(serviceName, projectPath, specFile);
  moveFiles(output, projectPath, serviceName);
  remakeIndices(projectPath);
  connectControllersToServices(projectPath, serviceName);
}

void createServiceDirectories(String projectPath, String serviceName) {
  Directory('$projectPath/src/controllers/$serviceName').createSync(recursive: true);
  Directory('$projectPath/src/datasources/$serviceName').createSync(recursive: true);
  Directory('$projectPath/src/models/$serviceName').createSync(recursive: true);
  Directory('$projectPath/src/repositories/$serviceName').createSync(recursive: true);
  Directory('$projectPath/src/services/$serviceName').createSync(recursive: true);
}

String runServiceCreation(String serviceName, String projectPath, File specFile) {
  final result = Process.runSync(
      'lb4', ['openapi', specFile.path, '--client', '--yes', '--datasource=$serviceName'],
      workingDirectory: projectPath, runInShell: true);
  final output = '${result.stdout}\n${result.stderr}';
  return output;
}

Map<String, String> moveFiles(String output, String projectPath, String serviceName) {
  final pathMapper = <String, String>{};
  final regexp =
      RegExp(r'create (?<path>src[\\/](?<folder>[a-z]+)[\\/](?<file>[a-z\-]+\.[a-z]+\.ts))');
  final matches = regexp.allMatches(output);
  for (final match in matches) {
    String fromPath = '$projectPath/${match.namedGroup('path')}';
    String toPath =
        '$projectPath/src/${match.namedGroup('folder')}/$serviceName/${match.namedGroup('file')}';
    final file = File(fromPath).renameSync(toPath);
    String content = file.readAsStringSync().replaceAll('../', '../../');
    final modelsRegexp = RegExp(r'/models/[a-z\-\.]*');
    content = content.replaceAll(modelsRegexp, '/models');
    file.writeAsStringSync(content);
    fromPath = fromPath.replaceAll(r'\', '/');
    fromPath = fromPath.substring(fromPath.indexOf('src/') + 4);
    toPath = toPath.replaceAll(r'\', '/').substring(toPath.indexOf('src/') + 4);
    pathMapper[fromPath] = toPath;
  }
  return pathMapper;
}

void remakeIndices(String projectPath) {
  final folders = ['controllers', 'datasources', 'models', 'repositories', 'services']
      .map((e) => Directory('$projectPath/src/$e'));
  for (final folder in folders) {
    final indexFile = File('${folder.path}/index.ts');
    String contents = '';
    for (final file in folder.listSync(recursive: true).whereType<File>()) {
      if (extension(file.path) == '.ts' && basename(file.path) != 'index.ts') {
        final relativePath = relative(file.path, from: folder.path);
        final finalPath =
            relativePath.substring(0, relativePath.lastIndexOf('.')).replaceAll(r'\', '/');
        contents += "export * from './$finalPath'\n";
      }
    }
    indexFile.writeAsStringSync(contents);
  }
}

void connectControllersToServices(String projectPath, String serviceName) {
  final controllers =
      Directory('$projectPath/src/controllers/$serviceName').listSync().whereType<File>();
  for (final controllerFile in controllers) {
    String fileContent = controllerFile.readAsStringSync();
    final controllerName = RegExp(r'export class (\w+) {').firstMatch(fileContent)[1];
    final serviceName = controllerName.replaceAll('Controller', 'Service');
    final providerName = serviceName + 'Provider';
    fileContent = "import {$serviceName, $providerName} from '../../services';\n"
            "import {service} from '@loopback/core';\n" +
        fileContent;
    fileContent = fileContent.replaceAll(
      'constructor()',
      'constructor(@service($providerName) public ${serviceName.camelCase}: $serviceName)',
    );
    final operationRegexp = RegExp(
        r'async (?<function>\w+)'
        r'\((?<params>(@[\w\.]+\(.*\) \w+: \w+, )*(@[\w\.]+\(.*\) \w+: \w+)?)\): '
        r"Promise<\w+> {\s+(?<body>throw new Error\('Not implemented'\);)",
        dotAll: true);
    fileContent = fileContent.replaceAllMapped(operationRegexp, (match) {
      final rematch = match as RegExpMatch;
      final params = rematch
          .namedGroup('params')
          .split(RegExp(r'@[\w\.]+\(.*?\)', dotAll: true))
          .where((element) => element.isNotEmpty)
          .map((e) => e.split(':').first.trim());
      return rematch[0].replaceFirst(
          rematch.namedGroup('body'),
          'return this.${serviceName.camelCase}.${rematch.namedGroup('function')}'
          '(${params.join(', ')})');
    });
    controllerFile.writeAsStringSync(fileContent);
  }
}
