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
import 'dart:math';
import './integrate.dart';
import 'package:path/path.dart';

const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';

void main(List<String> args) async {
  if (args.length != 2) {
    printHelp();
  } else {
    await runSingleIntegration(args[0], args[1]);
  }
}

Future<void> runSingleIntegration(String backplanePath, String specPath) async {
  final secretsFile = File('$backplanePath/.secrets.json');
  if (!secretsFile.existsSync()) {
    print('New secret file created');
    secretsFile.writeAsStringSync('{}');
  }
  final secrets = jsonDecode(secretsFile.readAsStringSync()) as Map<String, dynamic>;
  final random = Random.secure();
  final spec = File(specPath);
  final serviceName = basenameWithoutExtension(spec.path);
  print('Integrating $serviceName');

  manageSecret(secrets, serviceName, random);

  Directory('$backplanePath/integrated_services/sources').createSync(recursive: true);
  final fileName = '$backplanePath/integrated_services/$serviceName.json';
  final sourceName = '$backplanePath/integrated_services/sources/$serviceName.json';

  final specFile = spec.copySync(fileName)..copySync(sourceName);

  modifySpec(specFile);
  integrateService(backplanePath, serviceName, specFile);

  secretsFile.writeAsStringSync(JsonEncoder.withIndent('  ').convert(secrets));
}

void manageSecret(Map<String, dynamic> secrets, String serviceName, Random random) {
  if (!secrets.containsKey(serviceName)) {
    secrets[serviceName] = String.fromCharCodes(
      Iterable.generate(32, (_) => chars.codeUnitAt(random.nextInt(chars.length))),
    );
    print('New secret created');
  } else {
    print('Reusing secret');
  }
}

void printHelp() {
  print('Usage:\n'
      '\tdart single_integrator.dart <Backplane path> <Spec path>\n'
      '\tsingle_integrator <Backplane path> <Spec path>\n');
}
