import 'package:petitparser/petitparser.dart';

Parser singleLineComment() => string('//') & Token.newlineParser().neg().star();

Parser multiLineComment() => string('/*') & any().starLazy(string('*/')) & string('*/');

Parser space() => whitespace() | ref0(singleLineComment) | ref0(multiLineComment);

Parser accessLevel() => (string('public') | string('private')) & ref0(ws);

Parser ws() => ref0(space).plus().flatten();

Parser wsOpt() => ref0(space).star().flatten();

Parser lParen() => char('(').trim(ref0(space), ref0(space));

Parser rParen() => char(')').trim(ref0(space), ref0(space));

Parser lBracket() => char('{').trim(ref0(space), ref0(space));

Parser rBracket() => char('}').trim(ref0(space), ref0(space));

Parser lBrace() => char('[').trim(ref0(space), ref0(space));

Parser rBrace() => char(']').trim(ref0(space), ref0(space));

Parser lAngleBracket() => char('<').trim(ref0(space), ref0(space));

Parser rAngleBracket() => char('>').trim(ref0(space), ref0(space));

Parser comma() => char(',').trim(ref0(space), ref0(space));

Parser equals() => char('=').trim(ref0(space), ref0(space));

Parser colon() => char(':').trim(ref0(space), ref0(space));

Parser semicolon() => char(';').trim(ref0(space), ref0(space));

Parser bar() => char('|').trim(ref0(space), ref0(space));
