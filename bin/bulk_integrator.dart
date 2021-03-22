import 'dart:convert';
import 'dart:io';
import 'dart:math';
import './integrate.dart';
import 'package:path/path.dart';

const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';

void main(List<String> args) async {
  if (args.length != 2) {
    printHelp();
  } else {
    await runBulkIntegration(args[0], args[1]);
  }
}

Future<void> runBulkIntegration(String backplanePath, String specsPath) async {
  final secretsFile = File('$backplanePath/.secrets.json')..createSync();
  final secrets = jsonDecode(secretsFile.readAsStringSync()) as Map<String, String>;
  final random = Random.secure();
  final specsDir = Directory(specsPath);
  final specs = specsDir
      .listSync(followLinks: false)
      .whereType<File>()
      .where((element) => extension(element.path) == '.json')
      .toList();
  print('Integrating following services:');
  print('\t${specs.map((file) => basenameWithoutExtension(file.path)).join('\n\t')}');
  for (final spec in specs) {
    final serviceName = basenameWithoutExtension(spec.path);
    if (!secrets.containsKey(serviceName)) {
      secrets[serviceName] =
          String.fromCharCodes(Iterable.generate(32, (_) => chars.codeUnitAt(random.nextInt(chars.length))));
    }
    print('Integrating $serviceName');
    Directory('$backplanePath/integrated_services/sources').createSync(recursive: true);
    final fileName = '$backplanePath/integrated_services/$serviceName.json';
    final sourceName = '$backplanePath/integrated_services/sources/$serviceName.json';

    final specFile = spec.copySync(fileName)..copySync(sourceName);

    modifySpec(specFile);
    integrateService(backplanePath, serviceName, specFile);
  }
  secretsFile.writeAsStringSync(JsonEncoder.withIndent('  ').convert(secrets));
}

void printHelp() {
  print('Usage:\n'
      '\tdart bulk_integrator.dart <Backplane path> <Spacs path>\n'
      '\tbulk_integrator <Backplane path> <Spacs path>\n');
}
