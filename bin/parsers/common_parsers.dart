import 'package:petitparser/petitparser.dart';

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
