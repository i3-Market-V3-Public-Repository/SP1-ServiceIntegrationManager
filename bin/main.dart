import 'dart:io';

import 'package:petitparser/petitparser.dart';

import 'typescript_parser.dart';

void main() {
  final parser = Lb4ControllerDefinition().build();
  final content = File('ts/registration-offering.controller.ts').readAsStringSync();
  final result = parser.parse(content);
  print(result);
}