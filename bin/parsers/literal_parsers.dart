import 'package:petitparser/petitparser.dart';

import 'common_parsers.dart';

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

Parser identifier() => (pattern(r'$_a-zA-Z') & pattern(r'$_a-zA-Z0-9').star()).flatten();

Parser numericLiteral() => (digit().plus() & char('.')).optional() & digit().plus();
