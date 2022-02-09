import 'package:petitparser/petitparser.dart';

class Lb4ControllerDefinition extends GrammarDefinition {
  @override
  //TODO: implement
  // Parser start() => (ref0(importSection).labeled('Imports') & ref0(classDefinition).labeled('Class')).end();
  Parser start() => ref0(classMethod).end();

  Parser importSection() => ref0(importStatement).star();

  Parser importStatement() =>
      (string('import') & ref0(lBracket) & ref0(importBody) & ref0(rBracket)).pick(2) &
      (string('from') &
              ref0(wsOpt) &
              ref0(stringLiteral) &
              ref0(wsOpt) &
              char(';').optional() &
              Token.newlineParser().optional())
          .pick(2);

  Parser importBody() =>
      ref0(identifier).separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true);

  Parser classDefinition() =>
      ref0(wsOpt) &
      ref0(annotation).star() &
      string('export class').trim() &
      ref0(identifier) &
      ref0(lBracket) &
      ref0(classBody) &
      ref0(rBracket);

  Parser annotation() =>
      char('@') &
      ref0(identifier) &
      ref0(lParen) &
      (ref0(identifier) | ref0(literalValue))
          .flatten()
          .separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true)
          .optional() &
      ref0(rParen);

  Parser classBody() => ref0(classConstructor) & ref0(classMethod).star();

  Parser classConstructor() =>
      (ref0(wsOpt) & string('constructor') & ref0(lParen) & ref0(rParen) & ref0(lBracket) & ref0(rBracket)).flatten();

  Parser classMethod() =>
      ref0(wsOpt) &
      ref0(annotation) &
      ref0(wsOpt) &
      (string('async') & ref0(ws)).optional() &
      ref0(identifier) &
      ref0(parameterList).trim(ref0(lParen), ref0(rParen)) &
      ref0(colon) &
      ref0(type) &
      ref0(methodBody).trim(ref0(lBracket), ref0(rBracket));

  Parser parameterList() => ref0(parameter).separatedBy(ref0(comma), optionalSeparatorAtEnd: true).optional();

  Parser parameter() => ref0(annotation).optional() & ref0(identifier) & ref0(colon) & ref0(type);

  Parser type() => ref0(unionType) | ref0(arrayType) | ref0(primaryType);

  Parser unionType() => ref0(primaryType).separatedBy(ref0(bar));

  Parser primaryType() => ref0(typeReference) | ref0(predefinedType);

  Parser parenthesizedType() => ref0(type).trim(ref0(lParen), ref0(rParen));

  Parser predefinedType() =>
      string('any') | string('number') | string('boolean') | string('string') | string('void') | string('unknown');

  Parser typeReference() => ref0(typeName) & ref0(typeArguments).optional();

  Parser typeName() => ref0(identifier) | (ref0(moduleName) & char('.') & ref0(identifier));

  Parser moduleName() => ref0(identifier) | (ref0(moduleName) & char('.') & ref0(identifier));

  Parser typeArguments() => ref0(typeArgumentList).trim(ref0(lAngleBracket), ref0(rAngleBracket));

  Parser typeArgumentList() =>
      ref0(type).separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true);

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
          .separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true)
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

  Parser lParen() => char('(').trim();

  Parser rParen() => char(')').trim();

  Parser lBracket() => char('{').trim();

  Parser rBracket() => char('}').trim();

  Parser lBrace() => char('[').trim();

  Parser rBrace() => char(']').trim();

  Parser lAngleBracket() => char('<').trim();

  Parser rAngleBracket() => char('>').trim();

  Parser comma() => char(',').trim();

  Parser equals() => char('=').trim();

  Parser colon() => char(':').trim();

  Parser bar() => char('|').trim();
}
