import 'dart:io';
import './integrate.dart';
import 'package:path/path.dart';

void main(List<String> args) async {
  if (args.length != 2) {
    printHelp();
  } else {
    await runBulkIntegration(args[0], args[1]);
  }
}

Future<void> runBulkIntegration(String backplanePath, String specsPath) async {
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
    print('Integrating $serviceName');
    Directory('$backplanePath/integrated_services/sources').createSync(recursive: true);
    final fileName = '$backplanePath/integrated_services/$serviceName.json';
    final sourceName = '$backplanePath/integrated_services/sources/$serviceName.json';

    final specFile = spec.copySync(fileName)..copySync(sourceName);

    modifySpec(specFile);
    integrateService(backplanePath, serviceName, specFile);
  }
}

void printHelp() {
  print('Usage:\n'
      '\tdart bulk_integrator.dart <Backplane path> <Spacs path>\n'
      '\tbulk_integrator <Backplane path> <Spacs path>\n');
}
