/*
  Copyright 2020-2022 i3-MARKET Consortium:

  ATHENS UNIVERSITY OF ECONOMICS AND BUSINESS - RESEARCH CENTER
  ATOS SPAIN SA
  EUROPEAN DIGITAL SME ALLIANCE
  GFT ITALIA SRL
  GUARDTIME OU
  HOP UBIQUITOUS SL
  IBM RESEARCH GMBH
  IDEMIA FRANCE
  SIEMENS AKTIENGESELLSCHAFT
  SIEMENS SRL
  TELESTO TECHNOLOGIES PLIROFORIKIS KAI EPIKOINONION EPE
  UNIVERSITAT POLITECNICA DE CATALUNYA
  UNPARALLEL INNOVATION LDA

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:recase/recase.dart';
import 'package:validators2/validators.dart';
import 'package:yaml/yaml.dart';

import 'metaObjects/annotation.dart';
import 'metaObjects/controller.dart';
import 'metaObjects/import.dart';
import 'metaObjects/method.dart';
import 'parsers/typescript_parser.dart';

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
  if (specFile != null) {
    overwriteService(specFile, projectPath, serviceName);
  }
  return serviceName;
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
            securitySchemas.whereType<Map<String, dynamic>>().any((element) => element.containsKey('jwt'));
        if (isSecured) {
          final newParams = [
            {'name': 'id_token', 'in': 'header', 'required': true}
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
  print('Modify schema references');
  modifyOASSchemaRef(serviceName, specFile);
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

void modifyOASSchemaRef(String serviceName, File specFile){
  Map<String, dynamic> oasContent = json.decode(specFile.readAsStringSync());
  Map<String, dynamic> newSchemaMap = <String, dynamic>{};
  if (!oasContent.containsKey('components') || !oasContent['components'].containsKey('schemas')){ //Skip if no schemas are found components/schemas
    print('No schemas found under components/schemas - Skip!');
    return;
  }
  Map<String, dynamic> schemaMap = oasContent['components']['schemas'] as Map<String, dynamic>;
  print('Found ${schemaMap.length} entries to replace under components/schemas');
  schemaMap.forEach((key, value) {
    String keyMod = serviceName + '_' + key;
    newSchemaMap.addEntries([MapEntry(keyMod, value)]);
  });

  // replace schema map
  oasContent['components']['schemas'] = newSchemaMap;
  String res = json.encode(oasContent);

  // Replace internal references
  final regexp = RegExp("[\"\']#\/components\/schemas\/(.*?)[\"\']");
  final resMod = res.replaceAllMapped(regexp, (match) => match.group(0).toString()
      .replaceAll(match.group(1).toString(), serviceName + '_' + match.group(1).toString()));
  //rewrite 0AS File
  specFile.writeAsStringSync(resMod);
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
    for (var i = index + 1; i < indexEnd; i++) {
      //in case there exists more than one line (it shouldn't)
      final operationRegexp = RegExp(r'return (.*);');
      if (operationRegexp.hasMatch(content.elementAt(i))) {
        // found, replace return
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
    final controllerContent = controllerFile.readAsStringSync();
    final parsedController = Lb4ControllerDefinition().build().parse(controllerContent);
    final Controller controller = parsedController.value;
    protectControllerGrammar(controller, serviceName);
    connectControllerGrammar(controller, projectPath, serviceName);
    //removeRequestBodyRefs(controller);
    controllerFile.writeAsStringSync(controller.toString());
    formatController(controllerFile);
  }
}

void protectControllerGrammar(Controller controller, String serviceName) {
  final newImports = [
    ImportStatement(['authenticate'], '@loopback/authentication'),
    ImportStatement(['authorize'], '@loopback/authorization'),
    ImportStatement(['JWT_STRATEGY_NAME'], '../../auth/jwt.strategy'),
    ImportStatement(['SecurityBindings'], '@loopback/security'),
    ImportStatement(['BackplaneUserProfile'], '../../auth/users'),
    ImportStatement(['Request', 'RestBindings'], '@loopback/rest'),
    ImportStatement(['inject'], '@loopback/core'),
    ImportStatement(['sign'], 'jsonwebtoken'),
  ];
  controller.imports.addAll(newImports);
  for (final method in controller.classDefinition.methods) {
    final operationAnnotation = method.annotations.firstWhere((annotation) => annotation.name == 'operation');
    final verb = operationAnnotation.parameters[0].toUpperCase();
    final path = operationAnnotation.parameters[1];
    final newPath = '\'/$serviceName${path.substring(1)}';
    operationAnnotation.parameters[1] = newPath;
    final spec = loadYaml(operationAnnotation.parameters[2]) as Map;
    final security = spec['security'] as List?;
    if (security != null && serviceName != 'OpenIDConnectProvider') { // add exception OpenIDConnectProvider
      method.annotations.add(Annotation(name: 'authenticate', parameters: ['JWT_STRATEGY_NAME']));
      final scopes =
          (security.firstWhere((element) => (element as Map).containsKey('jwt'))['jwt'] as List);
      print('\t$verb: $path -> $newPath || Scopes: $scopes');
      if (scopes.isNotEmpty) {
        final scopesString = jsonEncode(scopes).replaceAll('"', "'");
        method.annotations.add(Annotation(name: 'authorize', parameters: ['{scopes: $scopesString}']));
      }
      method.body = "const idToken = this.request.headers['id_token']! as string;\n"
          '${method.body}';
    } else {
      print('\t$verb: $path -> $newPath || No security');
    }
    final numParams = method.parameters.length;
    method.parameters.removeWhere((param) => ['id_token'].contains(param.name));
    if (numParams != method.parameters.length) {
      method.parameters.insert(0, Parameter(
          annotation: Annotation(name: 'inject', parameters: ['SecurityBindings.USER']),
          name: 'backplaneUserProfile',
          type: 'BackplaneUserProfile'));
    }

    String operationSpec = operationAnnotation.parameters[2];
    /*operationSpec = operationSpec.replaceAll(
        RegExp(r" *\{\s*name\: 'backplane-authorization',\s*in: 'header',\s*required: true,\s*},\s*"), '');*/
    operationAnnotation.parameters[2] = operationSpec.replaceAll(
        RegExp(r" *\{\s*name\: 'id_token',\s*in: 'header',\s*required: true,\s*},\s*"), '');

   //method.documentation = method.documentation.replaceAll(RegExp(r'\* @param backplaneAuthorization\s+(?=\*)'), '');
    method.documentation =
        method.documentation.replaceAll(RegExp(r'\* @param idToken'), '* @param backplaneUserProfile');
  }
}

void connectControllerGrammar(Controller controller, String projectPath, String subsystemName) {
  final serviceName = controller.classDefinition.name.replaceAll(RegExp(r'Controller$'), 'Service');
  final providerName = serviceName + 'Provider';

  controller.imports.addAll([
    ImportStatement([serviceName, providerName], '../../services'),
    ImportStatement(['service'], '@loopback/core'),
  ]);

  controller.classDefinition.constructor.parameters.addAll([
    ConstructorParameter(
        annotation: Annotation(name: 'service', parameters: [providerName]),
        visibilitySpecifier: 'public',
        name: serviceName.camelCase,
        type: serviceName),
    ConstructorParameter(
        annotation: Annotation(name: 'inject', parameters: ['RestBindings.Http.REQUEST']),
        visibilitySpecifier: 'private',
        name: 'request',
        type: 'Request'),
  ]);

  print('\tNumber of endpoints: ${controller.classDefinition.methods.length}');
  for (final endpoint in controller.classDefinition.methods) {
    final endpointParams = endpoint.parameters.map((e) => e.name).join(', ');
    final functionParams =
        endpointParams.replaceFirst('backplaneUserProfile', 'idToken');
    endpoint.body += 'return this.${serviceName.camelCase}.${endpoint.name}($functionParams);';
  }
}

void removeRequestBodyRefs(Controller controller) {
  for (final method in controller.classDefinition.methods) {
    final requestBodyParam = method.parameters
        .map((e) => e.annotation)
        .firstWhere((element) => element?.name == 'requestBody', orElse: () => null);
    requestBodyParam?.parameters = [];
  }
}

void formatController(File controllerFile) {
  Process.runSync('tsfmt', ['-r', controllerFile.absolute.path], runInShell: true);
}
