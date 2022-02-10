import 'dart:io';

import 'package:petitparser/petitparser.dart';

import 'metaObjects/import.dart';
import 'parsers/typescript_parser.dart';

void main() {
  final parser = Lb4ControllerDefinition().build();
  // final content = File('ts/method.ts').readAsStringSync();
  final content = File('ts/audAcc.ts').readAsStringSync();
  final result = parser.parse(content);
  print(result);
}