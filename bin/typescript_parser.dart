import 'package:petitparser/petitparser.dart';

class Lb4ControllerDefinition extends GrammarDefinition {
  @override
  //TODO: implement
  Parser start() => (ref0(classMethod)).end();

  Parser topLevelStatement() => ref0(wsOpt) & ref0(importSection) & ref0(wsOpt) & ref0(classDefinition) & ref0(wsOpt);

  Parser importSection() => ref0(importStatement).star();

  Parser importStatement() =>
      string('import') &
      ref0(lBracket) &
      ref0(importBody) &
      ref0(rBracket) &
      string('from') &
      ref0(wsOpt) &
      ref0(stringLiteral) &
      ref0(wsOpt) &
      char(';').optional() &
      Token.newlineParser().optional();

  Parser importBody() => ref0(identifier).separatedBy(ref0(comma), includeSeparators: false);

  Parser classDefinition() =>
      ref0(annotation).star() &
      string('export') &
      ref0(ws) &
      string('class') &
      ref0(ws) &
      ref0(identifier) &
      ref0(lBracket) &
      ref0(classBody) &
      ref0(rBracket);

  Parser annotation() =>
      char('@') &
      ref0(identifier) &
      ref0(lParen) &
      (ref0(identifier) | ref0(literalValue)).separatedBy(ref0(comma), optionalSeparatorAtEnd: true).optional() &
      ref0(rParen);

  Parser classBody() => ref0(classConstructor) & ref0(classMethod).star();

  Parser classConstructor() =>
      ref0(wsOpt) & string('constructor') & ref0(lParen) & ref0(rParen) & ref0(lBracket) & ref0(rBracket);

  Parser classMethod() =>
      ref0(wsOpt) &
      ref0(annotation).star() &
      ref0(wsOpt) &
      (string('async') & ref0(ws)).optional() &
      ref0(identifier) &
      ref0(lParen) &
      ref0(parameterList) &
      ref0(rParen) &
      ref0(colon) &
      ref0(type) &
      ref0(lBracket) &
      ref0(methodBody) &
      ref0(rBracket);

  Parser parameterList() => ref0(parameter).separatedBy(ref0(comma), optionalSeparatorAtEnd: true).optional();

  Parser parameter() => ref0(annotation).optional() & ref0(identifier) & ref0(colon) & ref0(type);

  Parser type() => ref0(primaryOrUnionType)/* | ref0(functionType) | ref0(constructorType)*/;

  Parser primaryOrUnionType() => ref0(primaryType) | ref0(unionType);

  Parser unionType() => ref0(primaryOrUnionType) & ref0(bar) & ref0(primaryType);

  Parser primaryType() =>
      ref0(parenthesizedType) |
      ref0(arrayType) |
      ref0(predefinedType) |
      ref0(typeReference);
      // ref0(objectType) |
      // ref0(tupleType) |
      // ref0(typeQuery);

  Parser parenthesizedType() => ref0(lParen) & ref0(type) & ref0(rParen);

  Parser predefinedType() => string('any') | string('number') | string('boolean') | string('string') | string('void');

  Parser typeReference() => ref0(typeName) & ref0(typeArguments).optional();

  Parser typeArguments() => ref0(lAngleBracket) & ref0(typeArgumentList) & ref0(rAngleBracket);

  Parser typeArgumentList() => ref0(type) | ref0(typeArgumentList) & ref0(comma) & ref0(type);

  Parser typeName() => ref0(identifier) | (ref0(moduleName) & char('.') & ref0(identifier));

  Parser moduleName() => ref0(identifier) | (ref0(moduleName) & char('.') & ref0(identifier));

  Parser arrayType() => ref0(primaryType) & ref0(lBracket) & ref0(rBracket);

  Parser methodBody() => string("throw new Error('Not implemented');");

  Parser identifier() => (pattern(r'$_a-zA-Z') & pattern(r'$_a-zA-Z0-9').star()).flatten();

  Parser literalValue() =>
      string('true') |
      string('false') |
      string('null') |
      ref0(stringLiteral) |
      ref0(numericLiteral) |
      ref0(arrayLiteral) |
      ref0(objectLiteral);

  Parser arrayLiteral() =>
      ref0(lBrace) &
      (ref0(identifier) | ref0(literalValue)).separatedBy(ref0(comma), optionalSeparatorAtEnd: true).optional() &
      ref0(rBrace);

  Parser objectLiteral() =>
      ref0(lBracket) &
      ((ref0(identifier) | ref0(stringLiteral)) & ref0(colon) & ref0(literalValue))
          .separatedBy(ref0(comma), optionalSeparatorAtEnd: true)
          .optional() &
      ref0(rBracket);

  Parser stringLiteral() => ((char("'") & any().starLazy(char("'")) & char("'")) |
          (char('"') & any().starLazy(char('"')) & char('"')) |
          (char('`') & any().starLazy(char('`')) & char('`')))
      .flatten();

  // Only decimal now
  Parser numericLiteral() => (digit().plus() & char('.')).optional() & digit().plus();

  Parser singleLineComment() => string('//') & Token.newlineParser().neg().star();

  Parser multiLineComment() => string('/*') & any().starLazy(string('*/')) & string('*/');

  Parser space() => whitespace() | ref0(singleLineComment) | ref0(multiLineComment);

  Parser accessLevel() => (string('public') | string('private')) & ref0(ws);

  Parser ws() => ref0(space).plus().flatten();

  Parser wsOpt() => ref0(space).star().flatten();

  Parser lParen() => (ref0(wsOpt) & char('(') & ref0(wsOpt)).flatten().trim();

  Parser rParen() => (ref0(wsOpt) & char(')') & ref0(wsOpt)).flatten().trim();

  Parser lBracket() => (ref0(wsOpt) & char('{') & ref0(wsOpt)).flatten().trim();

  Parser rBracket() => (ref0(wsOpt) & char('}') & ref0(wsOpt)).flatten().trim();

  Parser lBrace() => (ref0(wsOpt) & char('[') & ref0(wsOpt)).flatten().trim();

  Parser rBrace() => (ref0(wsOpt) & char(']') & ref0(wsOpt)).flatten().trim();

  Parser lAngleBracket() => (ref0(wsOpt) & char('<') & ref0(wsOpt)).flatten().trim();

  Parser rAngleBracket() => (ref0(wsOpt) & char('>') & ref0(wsOpt)).flatten().trim();

  Parser comma() => (ref0(wsOpt) & char(',') & ref0(wsOpt)).flatten().trim();

  Parser equals() => (ref0(wsOpt) & char('=') & ref0(wsOpt)).flatten().trim();

  Parser colon() => (ref0(wsOpt) & char(':') & ref0(wsOpt)).flatten().trim();

  Parser bar() => (ref0(wsOpt) & char('|') & ref0(wsOpt)).flatten().trim();
}
