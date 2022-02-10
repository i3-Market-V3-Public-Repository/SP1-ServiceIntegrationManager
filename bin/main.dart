import 'dart:io';

import 'package:petitparser/petitparser.dart';

import 'metaObjects/import.dart';
import 'parsers/typescript_parser.dart';

void main() {
  final parser = Lb4ControllerDefinition().build();
  // final content = File('ts/method.ts').readAsStringSync();
  final content = File('ts/full.ts').readAsStringSync();
  final result = parser.parse(content);
  print(result);
  ImportSection importSection = result.value[0];
  final merged = importSection.merge();
  print(merged.join('\n'));
}