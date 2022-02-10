import 'package:petitparser/petitparser.dart';

import 'common_parsers.dart';
import 'literal_parsers.dart';

class TypeDefinition extends GrammarDefinition {
  @override
  Parser start() => ref0(type);

  Parser type() => char('(').trim() & ref0(unionType) & char(')').trim() & ref0(arrayModifier) | ref0(unionType);

  Parser unionType() => (ref0(typeReference) & ref0(arrayModifier)).separatedBy(ref0(bar));

  Parser arrayModifier() => (string('[').trim() & string(']').trim()).star();

  Parser typeReference() => ref0(typeName) & ref0(typeArguments).optional();

  Parser typeName() => (ref0(identifier) & char('.') & ref0(typeName)) | ref0(identifier);

  Parser typeArguments() => ref0(typeArgumentList).trim(ref0(lAngleBracket), ref0(rAngleBracket));

  Parser typeArgumentList() =>
      ref0(type).separatedBy(ref0(comma), includeSeparators: false, optionalSeparatorAtEnd: true);
}
