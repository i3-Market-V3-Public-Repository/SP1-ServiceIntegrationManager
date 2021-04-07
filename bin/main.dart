import 'dart:io';

import 'typescript_parser.dart';

void main() {
  final parser = TypescriptDefinition().build();
  final content = File('ts/hello.controller.ts').readAsStringSync();
  final result = parser.parse(content);
  print('Hey');
  print(result);
}