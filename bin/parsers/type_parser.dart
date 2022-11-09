import 'package:petitparser/petitparser.dart';

import 'common_parsers.dart';
import 'literal_parsers.dart';

class TypeDefinition extends GrammarDefinition {
  @override
  Parser start() => ref0(type);

  Parser type() => ref0(lParen) & ref0(unionType) & ref0(rParen) & ref0(arrayModifier) | ref0(unionType);

  Parser unionType() =>
      ((ref0(typeReference) | ref0(objectType) | ref0(stringLiteral)) & ref0(arrayModifier)).separatedBy(ref0(bar) | ref0(join));

  Parser arrayModifier() => (ref0(lBrace) & ref0(rBrace)).star();

  Parser typeReference() => ref0(typeName) & ref0(typeArguments).optional();

  Parser typeName() => (ref0(identifier) & char('.') & ref0(typeName)) | ref0(identifier);

  Parser typeArguments() => ref0(typeArgumentList).trim(ref0(lAngleBracket), ref0(rAngleBracket));

  Parser typeArgumentList() =>
      ref0(type).separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true);

  Parser objectType() =>
      ref0(lBracket) &
      (ref0(objectTypeElement).separatedBy(ref0(semicolon), optionalSeparatorAtEnd: true) | ref0(dictType)).optional() &
      ref0(rBracket);

  Parser objectTypeElement() => (ref0(identifier) | ref0(stringLiteral)) & char('?').optional() & ref0(colon) & ref0(type);

  Parser dictType() =>
      ref0(lBrace) &
      ref0(identifier) &
      ref0(colon) &
      ref0(type) &
      ref0(rBrace) &
      ref0(colon) &
      ref0(type) &
      ref0(semicolon);
}
