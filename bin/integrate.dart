import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:recase/recase.dart';
import 'package:validators2/validators.dart';
import 'package:yaml/yaml.dart';

void main(List<String> arguments) async {
  welcome();
  final projectPath = askBasePath();
  final serviceName = askServiceNameAndOverwrite(projectPath);
  final specFile = await getSpec(projectPath, serviceName);
  modifySpec(specFile);
  integrateService(projectPath, serviceName, specFile);
}

void welcome() {
  print('Welcome to the i3-Market Service Integration Manager');
}

String askBasePath() {
  print('Enter the path of the backplane project [.]:');
  final path = stdin.readLineSync() ?? '';
  return path.isEmpty ? '.' : path;
}

String askServiceNameAndOverwrite(String projectPath) {
  print('Enter the name of the service to be integrated (e.g. auditableAccounting):');
  final serviceName = (stdin.readLineSync() ?? '').camelCase;
  final integratedServicesDirectory = Directory('$projectPath/integrated_services')..createSync();
  Directory('$projectPath/integrated_services/sources').createSync();
  final specFile = getFile(integratedServicesDirectory, serviceName);
  if (specFile == null) {
    createSecret(projectPath, serviceName);
  } else {
    overwriteService(specFile, projectPath, serviceName);
  }
  return serviceName;
}

void createSecret(String projectPath, String serviceName) {
  final secretsFile = File('$projectPath/src/secrets.json')..createSync();
  final content = secretsFile.readAsStringSync();
  final secrets = jsonDecode(content.isEmpty ? '{}' : content) as Map<String, dynamic>;
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  final random = Random.secure();
  final secret = String.fromCharCodes(Iterable.generate(32, (_) => chars.codeUnitAt(random.nextInt(chars.length))));
  secrets[serviceName] = secret;
  secretsFile.writeAsStringSync(JsonEncoder.withIndent('  ').convert(secrets));
  print('Secret generated for the $serviceName service: $secret');
}

void overwriteService(File specFile, String projectPath, String serviceName) {
  print('A service with this name is already integrated.');
  print('Do you want to overwrite it? [y/N]: ');
  final confirmation = {'y', 'yes'}.contains(stdin.readLineSync()?.toLowerCase());
  if (confirmation) {
    specFile.deleteSync();
    try {
      File('${specFile.parent.path}/sources/$serviceName.json').deleteSync();
    } catch (_) {
      print('Error deleting OAS');
    }
    final dirs = [
      '$projectPath/src/controllers/$serviceName',
      '$projectPath/src/datasources/$serviceName',
      '$projectPath/src/models/$serviceName',
      '$projectPath/src/repositories/$serviceName',
      '$projectPath/src/services/$serviceName',
    ];
    for (final dir in dirs) {
      try {
        Directory(dir).deleteSync(recursive: true);
      } catch (_) {
        print('Error deleting $dir');
      }
    }
  } else {
    exit(1);
  }
}

File? getFile(Directory directory, String filename) {
  for (final file in directory.listSync().whereType<File>()) {
    if (basenameWithoutExtension(file.path) == filename) return file;
  }
  return null;
}

Future<File> getSpec(String projectPath, String serviceName) async {
  File? specFile;
  final fileName = '$projectPath/integrated_services/$serviceName.json';
  final sourceName = '$projectPath/integrated_services/sources/$serviceName.json';
  do {
    print('Enter the OpenAPI (JSON) spec url or file path:');
    final specPath = stdin.readLineSync() ?? '';
    if (isURL(specPath)) {
      final content = await downloadContent(specPath);
      if (content != null) {
        if (!isJSON(content)) {
          print('The OpenAPI spec must be in JSON format');
          continue;
        }
        specFile = File(fileName)
          ..createSync()
          ..writeAsStringSync(content);
      }
    } else {
      final tempFile = File(specPath);
      if (tempFile.existsSync()) {
        if (extension(tempFile.path) != '.json') {
          print('The OpenAPI spec must be in JSON format');
          continue;
        }
        specFile = tempFile.copySync(fileName);
      } else {
        print('File not found');
      }
    }
  } while (specFile == null);
  print('Spec obtained');
  specFile.copySync(sourceName);
  return specFile;
}

Future<String?> downloadContent(String url) async {
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

void modifySpec(File specFile) {
  final content = jsonDecode(specFile.readAsStringSync()) as Map<String, dynamic>;
  final paths = content['paths'] as Map<String, dynamic>;
  for (final path in paths.keys) {
    final endpoint = paths[path] as Map<String, dynamic>;
    for (final method in endpoint.keys) {
      const acceptedMethods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
      if (!acceptedMethods.contains(method.toLowerCase())) continue;
      final metadata = endpoint[method] as Map<String, dynamic>;
      if (metadata.containsKey('security')) {
        final securitySchemas = metadata['security'] as List;
        final isSecured =
            securitySchemas.whereType<Map<String, dynamic>>().any((element) => element.containsKey('openIdConnect'));
        if (isSecured) {
          final newParams = [
            {'name': 'backplane-authorization', 'in': 'header', 'required': true},
            {'name': 'backplane-token', 'in': 'header', 'required': true}
          ];
          metadata.update('parameters', (value) => (value as List)..insertAll(0, newParams), ifAbsent: () => newParams);
        }
      }
      if (!metadata.containsKey('operationId')) {
        final pathParts = path.split('/').map((e) =>
            e.startsWith('{') && e.endsWith('}') ? 'By${e.substring(1, e.length - 1).pascalCase}' : e.pascalCase);
        metadata['operationId'] = '${method.toLowerCase()}${pathParts.join()}';
      }
    }
  }

  specFile.writeAsStringSync(JsonEncoder.withIndent('  ').convert(content));
}

void integrateService(String projectPath, String serviceName, File specFile) {
  print('Creating directories');
  createServiceDirectories(projectPath, serviceName);
  print('Creating sources');
  String output = runServiceCreation(serviceName, projectPath, specFile);
  print('Moving files');
  moveFiles(output, projectPath, serviceName);
  print('Remaking indices');
  remakeIndices(projectPath);
  print('Adding logs to Datasources');
  addLogs(projectPath, serviceName);
  print('Customize Datasources');
  customizeDatasources(projectPath, serviceName);
  print('Finishing controllers');
  finishControllers(projectPath, serviceName);
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
    'lb4',
    ['openapi', canonicalize(specFile.path), '--client', '--yes', '--datasource=$serviceName'],
    workingDirectory: projectPath,
    runInShell: true,
  );
  final output = '${result.stdout}\n${result.stderr}';
  print('Service creation stdout:');
  print(result.stdout);
  print('Service creation stderr:');
  print(result.stderr);
  return output;
}

Map<String, String> moveFiles(String output, String projectPath, String serviceName) {
  final pathMapper = <String, String>{};
  final regexp = RegExp(r'create (?<path>src[\\/](?<folder>[a-z]+)[\\/](?<file>[\w\-]+\.[a-z]+\.ts))');
  final matches = regexp.allMatches(output);
  for (final match in matches) {
    String fromPath = '$projectPath/${match.namedGroup('path')}';
    if (match.namedGroup('path')!.contains('with-relations')) {
      File(fromPath).deleteSync();
      continue;
    }
    String toPath = '$projectPath/src/${match.namedGroup('folder')}/$serviceName/${match.namedGroup('file')}';
    final file = File(fromPath).renameSync(toPath);
    String content = file.readAsStringSync().replaceAll('../', '../../');
    final modelsRegexp = RegExp(r'/models/[\w\-\.]*');
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
  final folders =
      ['controllers', 'datasources', 'models', 'repositories', 'services'].map((e) => Directory('$projectPath/src/$e'));
  for (final folder in folders) {
    final indexFile = File('${folder.path}/index.ts');
    String contents = '';
    for (final file in folder.listSync(recursive: true).whereType<File>()) {
      if (extension(file.path) == '.ts' && basename(file.path) != 'index.ts') {
        final relativePath = relative(file.path, from: folder.path);
        final finalPath = relativePath.substring(0, relativePath.lastIndexOf('.')).replaceAll(r'\', '/');
        contents += "export * from './$finalPath'\n";
      }
    }
    indexFile.writeAsStringSync(contents);
  }
}

void addLogs(String projectPath, String serviceName) {
  final datasources = Directory('$projectPath/src/datasources/$serviceName').listSync().whereType<File>();
  for (final datasource in datasources) {
    print('\tAdding logs to ${basename(datasource.path)}');
    final content = datasource.readAsLinesSync();
    final index = content.indexWhere((element) => element.contains('if (response.status < 400) {'));
    if (index == -1) continue;
    content.insert(index,
        r"  console.log(`Request redirect to -> ${response.method ?? ''}${response.url} => ${response.status} ${response.statusText}`);");
    datasource.writeAsStringSync(content.join('\n'));
  }
}

//Customize object return of datasources transformResponse function, encapsulates response
void customizeDatasources(String projectPath, String serviceName) {
  final datasources = Directory('$projectPath/src/datasources/$serviceName').listSync().whereType<File>();
  for (final datasource in datasources) {
    print('\tCustomizing datasource -> ${basename(datasource.path)}');
    final content = datasource.readAsLinesSync();
    final index = content.indexWhere((element) => element.contains('if (response.status < 400) {'));
    if (index == -1) continue;
    final indexEnd = content.indexWhere((element) => element == '  }', index);
    if (indexEnd == -1) continue;
    for(var i = index+1; i < indexEnd; i++) { //in case there exists more than one line (it shouldn't)
      final operationRegexp = RegExp(r'return (.*);');
      if (operationRegexp.hasMatch(content.elementAt(i))){ // found, replace return
        final itemToReturn = operationRegexp.firstMatch(content.elementAt(i))?.group(1);
        final newLine = '   return {isOpenApi: true, headers: response.headers, value: ($itemToReturn)};';
        content[i] = newLine;
      }
    }
    datasource.writeAsStringSync(content.join('\n'));
  }
}

void finishControllers(String projectPath, String serviceName) {
  final controllers = Directory('$projectPath/src/controllers/$serviceName').listSync().whereType<File>();
  for (final controllerFile in controllers) {
    print('Finishing controller ${basename(controllerFile.path)}');
    final controller = controllerFile.readAsStringSync().replaceAll(RegExp(r'^\s*//.*', multiLine: true), '');
    final protectedController = protectController(serviceName, controller);
    final connectedController = connectController(protectedController, projectPath, serviceName);
    final finishedController = removeRequestBodyRefs(connectedController);
    controllerFile.writeAsStringSync(finishedController);
  }
}

String protectController(String serviceName, String controller) {
  controller = "import {authenticate} from '@loopback/authentication';\n"
          "import {authorize} from '@loopback/authorization';\n"
          "import {JWT_STRATEGY_NAME} from '../../auth/jwt.strategy';\n"
          "import {SecurityBindings} from '@loopback/security';\n"
          "import {BackplaneUserProfile} from '../../auth/users';\n"
          "import {Request, RestBindings} from '@loopback/rest';\n"
          "import {inject} from '@loopback/core';\n"
          "import {sign} from 'jsonwebtoken';\n" +
      controller;
  final operationRegexp = RegExp(
      r"@operation\('(?<verb>\w+)', '(?<path>[\w\/?&%\-\{\}]+)', (?<spec>\{.*?\}(?=\)\s*async))\)\s*"
      r'async (?<function>\w+)'
      r'\((?<params>(@[\w\.]+\(.*?\) \w+: [\w\|\{\}\s\[\];:?]+(\s*,\s*)?)*?)\): '
      //FIXME Can fail if promised object contains "
      r"Promise<[\w\|\{\}\s\[\]\?\:\;\#']+> {\s+(?<body>throw new Error\('Not implemented'\);)",
      dotAll: true);
  for (final match in operationRegexp.allMatches(controller)) {
    final method = match.namedGroup('verb')!.toUpperCase();
    final path = match.namedGroup('path')!;
    final newPath = '/$serviceName$path';
    final spec = loadYaml(match.namedGroup('spec')!) as Map;
    final security = spec['security'] as List?;
    var endpoint = match[0]!;
    endpoint = endpoint.replaceAll(path, newPath);
    if (security != null) {
      final scopes =
          (security.firstWhere((element) => (element as Map).containsKey('openIdConnect'))['openIdConnect'] as List);
      print('\t$method: $path -> $newPath || Scopes: $scopes');
      endpoint = endpoint.replaceFirst('async', '@authenticate(JWT_STRATEGY_NAME)\n  async');
      if (scopes.isNotEmpty) {
        final scopesString = jsonEncode(scopes).replaceAll('"', "'");
        endpoint = endpoint.replaceFirst('async', '@authorize({scopes: $scopesString})\n  async');
      }
      final body = match.namedGroup('body')!;
      endpoint = endpoint.replaceAll(
          body,
          'const backplaneAuthorization = `\${sign(backplaneUserProfile, this.secret)}`;\n'
          "    const backplaneToken = this.request.headers['authorization']!;\n"
          '    $body');
    } else {
      print('\t$method: $path -> $newPath || No security');
    }
    controller = controller.replaceFirst(match[0]!, endpoint);
  }

  final authParamSpecRegexp =
      RegExp(r" *\{\s*name\: 'backplane-authorization',\s*in: 'header',\s*required: true,\s*},\s*");
  controller = controller.replaceAll(authParamSpecRegexp, '');

  final authParamRegexp = RegExp(
      r"@param\(\{\s*name\: 'backplane-authorization',\s*in: 'header',\s*required: true,\s*\}\) backplaneAuthorization: string");
  controller = controller.replaceAll(authParamRegexp, '@inject(SecurityBindings.USER) backplaneUserProfile: BackplaneUserProfile');

  final jsAuthDocRegexp = RegExp(r'\* @param backplaneAuthorization\s+(?=\*)');
  controller = controller.replaceAll(jsAuthDocRegexp, '');

  final tokenParamSpecRegexp = RegExp(r" *\{\s*name\: 'backplane-token',\s*in: 'header',\s*required: true,\s*},\s*");
  controller = controller.replaceAll(tokenParamSpecRegexp, '');

  final tokenParamRegexp = RegExp(
      r"@param\(\{\s*name\: 'backplane-token',\s*in: 'header',\s*required: true,\s*\}\) backplaneToken: string,?");
  controller = controller.replaceAll(tokenParamRegexp, '');

  final jsTokenDocRegexp = RegExp(r'\* @param backplaneToken');
  controller = controller.replaceAll(jsTokenDocRegexp, '* @param backplaneUserProfile');

  return controller;
}

String connectController(String protectedController, String projectPath, String subsystemName) {
  String controller = protectedController;
  final controllerName = RegExp(r'export class (\w+) {').firstMatch(controller)![1]!;
  final serviceName = controllerName.replaceAll(RegExp(r'Controller$'), 'Service');
  final providerName = serviceName + 'Provider';
  controller = "import {$serviceName, $providerName} from '../../services';\n"
          "import {service} from '@loopback/core';\n" +
      controller;
  controller = controller.replaceAll(
    'constructor() {}',
    'private readonly secret: string;\n'
        '  constructor(@service($providerName) public ${serviceName.camelCase}: $serviceName,\n'
        '              @inject(RestBindings.Http.REQUEST) private request: Request,\n'
        "              @inject('config.secrets') private secrets: {[service: string]: string}) {\n"
        "    this.secret = this.secrets['$subsystemName'];\n"
        '  }',
  );
  final operationRegexp = RegExp(
      r'async (?<function>\w+)'
      r'\((?<params>(@[\w\.]+\(.*?\) \w+: [\w\|\{\}\s\[\];:?]+(\s*,\s*)?)*?)\): '
      r"Promise<[\w\|\{\}\s\[\]\?\:\;\#']+> {(?<body>(?<userBody>.*?)?throw new Error\('Not implemented'\);)",
      dotAll: true);
  print('\tNumber of endpoints: ${operationRegexp.allMatches(controller).length}');
  return controller.replaceAllMapped(operationRegexp, (match) {
    final rematch = match as RegExpMatch;
    final params = rematch
        .namedGroup('params')!
        // FIXME Can fail if parameter specification has the string '})' somewhere
        .split(RegExp(r'@[\w\.]+\(\{?.*?(?:\}|USER)\)', dotAll: true))
        .where((element) => element.isNotEmpty)
        .map((e) => e.split(':').first.trim());
    return rematch[0]!.replaceFirst(
        rematch.namedGroup('body')!,
        '${rematch.namedGroup('userBody') ?? ''}return this.${serviceName.camelCase}.${rematch.namedGroup('function')}'
        '(${params.join(', ').replaceFirst('backplaneUserProfile', 'backplaneAuthorization, backplaneToken')})');
  });
}

String removeRequestBodyRefs(String controller) {
  final requestBodyRefRegexp = RegExp(
    r"@requestBody\(\s*\{\s*\$ref: '#\/components\/requestBodies\/DataOffering',?\s*\}\s*\)",
  );
  return controller.replaceAll(requestBodyRefRegexp, '@requestBody()');
}
