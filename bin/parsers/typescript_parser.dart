import 'package:petitparser/petitparser.dart';

import '../metaObjects/annotation.dart';
import '../metaObjects/class.dart';
import '../metaObjects/controller.dart';
import '../metaObjects/import.dart';
import '../metaObjects/method.dart';
import 'common_parsers.dart';
import 'literal_parsers.dart';
import 'type_parser.dart';

class Lb4ControllerDefinition extends GrammarDefinition {
  @override
  //TODO: implement
  Parser start() => (ref0(importSection) & ref0(classDefinition)).map((value) => Controller(value[0], value[1])).end();

  Parser importSection() => ref0(importStatement).star().map((value) => ImportSectionExt.fromDynamic(value).merge());

  Parser importStatement() => (string('import') &
          ref0(lBracket) &
          ref0(importBody) &
          ref0(rBracket) &
          string('from') &
          ref0(wsOpt) &
          ref0(stringLiteral) &
          ref0(wsOpt) &
          char(';').optional() &
          Token.newlineParser().optional())
      .map((value) => ImportStatement((value[2] as List).cast<String>(), value[6]));

  Parser importBody() =>
      ref0(identifier).separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true);

  Parser classDefinition() => (ref0(wsOpt) &
          ref0(annotation).star() &
          ref0(wsOpt) &
          string('export class') &
          ref0(wsOpt) &
          ref0(identifier) &
          ref0(lBracket) &
          ref0(classBody) &
          ref0(rBracket))
      .map((value) => Class(
            documentation: value[0],
            annotations: (value[1] as List).cast<Annotation>(),
            name: value[5],
            variables: [],
            constructor: (value[7] as List)[0],
            methods: ((value[7] as List)[1] as List).cast<Method>(),
          ));

  Parser annotation() => (char('@') &
          ref0(identifier) &
          ref0(lParen) &
          (ref0(identifier) | ref0(literalValue))
              .flatten()
              .separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true)
              .optional() &
          ref0(rParen))
      .map((value) => Annotation(name: value[1], parameters: (value[3] as List).cast<String>()));

  Parser classBody() => ref0(classConstructor) & ref0(classMethod).star();

  Parser classConstructor() =>
      (ref0(wsOpt) & string('constructor') & ref0(lParen) & ref0(rParen) & ref0(lBracket) & ref0(rBracket))
          .map((value) => Constructor([], ''));

  Parser classMethod() => (ref0(wsOpt) &
          ref0(annotation).star() &
          ref0(wsOpt) &
          (string('async') & ref0(ws)).optional() &
          ref0(identifier) &
          ref0(lParen) &
          ref0(parameterList).optional() &
          ref0(rParen) &
          ref0(colon) &
          ref0(type) &
          ref0(lBracket) &
          ref0(methodBody) &
          ref0(rBracket))
      .map((value) => Method(
          documentation: value[0],
          annotations: value[1],
          async: value[3] != null,
          name: value[4],
          parameters: (value[6] as List? ?? []).cast<Parameter>(),
          returnType: value[9],
          body: value[11]));

  Parser parameterList() =>
      ref0(parameter).separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true);

  Parser parameter() => (ref0(annotation).optional() & ref0(identifier) & ref0(colon) & ref0(type))
      .map((value) => Parameter(annotation: value[0], name: value[1], type: value[3]));

  Parser methodBody() => string("throw new Error('Not implemented');");

  Parser type() => TypeDefinition().build().flatten();
}
