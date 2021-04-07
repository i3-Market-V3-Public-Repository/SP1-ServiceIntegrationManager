import 'package:petitparser/definition.dart';
import 'package:petitparser/parser.dart';
import 'package:petitparser/src/core/parser.dart';

class TypescriptDefinition extends GrammarDefinition {
  @override
  //TODO: implement
  Parser start() => throw UnimplementedError();


  Parser literalValue() =>
      (string('true') | string('false')) | string('null') | ref0(stringLiteral) | ref0(numericLiteral);

  Parser stringLiteral() => pattern(r'".*"');

  Parser numericLiteral() => pattern(r'((?:(?:[0-9]*)?\.?[0-9a-fA-F]+(?:[Ee][\-\+]?[0-9]+))|0[Xx]\p{XDigit}+)');

  Parser singleLineComment() => string('//') & pattern(r'[^\n]*');

  Parser multiLineComment() => string('/*') & ref0(insideMultiLineComment) & string('*/');

  Parser insideMultiLineComment() =>
      (string('*/') | string('/*')).not() & (pattern(r'.') | pattern(r'[\n\r]')) | ref0(multiLineComment);

  Parser whitespace() => pattern(r'\s+') | ref0(singleLineComment) | ref0(multiLineComment);

  Parser accessLevel() => (string('public') | string('private')) & ref0(ws);

  Parser ws() => ref0(whitespace).plus();

  Parser wsOpt() => ref0(whitespace).star();

  Parser lParen() => ref0(wsOpt) & char('(') & ref0(wsOpt);

  Parser rParen() => ref0(wsOpt) & char(')') & ref0(wsOpt);

  Parser lBrace() => ref0(wsOpt) & char('[') & ref0(wsOpt);

  Parser rBrace() => ref0(wsOpt) & char(']') & ref0(wsOpt);

  Parser comma() => ref0(wsOpt) & char(',') & ref0(wsOpt);

  Parser equals() => ref0(wsOpt) & char('=') & ref0(wsOpt);
}


// Parser declarationSourceFile() => ref0(wsOpt) & ref0(declarationElement).star();
//
// Parser typeParameters() => char('<') & ref0(typeParameter) & (char(',') & ref0(typeParameter)).star() & char('>');
//
// Parser typeParameter() => ref0(wsOpt) & ref0(identifier) & (ref0(ws) & ref0(constraint)).optional() & ref0(wsOpt);
//
// Parser identifier() => pattern(r'[$_\p{L}][$_\p{L}\p{N}]*');
//
// Parser constraint() => string('extends') & ref0(ws) & ref0(type);
//
// // predefinedType commented
// Parser type() => ref0(typeLiteral) | ref0(typeReference) | ref0(typeQuery) | ref0(predefinedType);
//
// // predefinedType commented
// Parser predefinedType() => string('any') | string('number') | string('boolean') | string('string') | string('void');
//
// Parser typeReference() => ref0(qualifiedIdentifier) & (ref0(wsOpt) & ref0(typeArguments)).optional();
//
// Parser qualifiedIdentifier() => ref0(identifier) | (ref0(moduleName) & char('.') & ref0(identifier));
//
// Parser moduleName() => ref0(identifier) & (char('.') & ref0(identifier)).star();
//
// Parser typeArguments() => char('<') & ref0(typeArgumentList) & char('>');
//
// Parser typeArgumentList() => ref0(typeArgument) & (char(',') & ref0(typeArgument)).star();
//
// Parser typeArgument() => ref0(wsOpt) & ref0(type) & ref0(wsOpt);
//
// Parser typeQuery() => string('typeof') & ref0(ws) & ref0(qualifiedIdentifier);
//
// Parser typeLiteral() => ref0(objectType) | ref0(arrayType) | ref0(functionType) | ref0(constructorType);
//
// Parser arrayType() => ref0(elementType) & ref0(lBrace) & ref0(rBrace);
//
// // predefinedType commented
// Parser elementType() =>
//     ref0(typeQuery) | ref0(typeReference) | ref0(predefinedType) | ref0(objectType) | ref0(arrayType);
//
// Parser functionType() =>
//     ref0(typeParameters).optional() &
//     ref0(lParen) &
//     ref0(parameterList).optional() &
//     ref0(rParen) &
//     string('=>') &
//     ref0(wsOpt) &
//     ref0(type);
//
// Parser constructorType() => string('new') & ref0(ws) & ref0(functionType);
//
// Parser objectType() => char('{') & ref0(wsOpt) & (ref0(typeBody) & ref0(wsOpt)).optional() & char('}');
//
// Parser typeBody() => ref0(typeMemberList) & ref0(wsOpt) & char(';').optional();
//
// Parser typeMemberList() => ref0(typeMember) & ref0(wsOpt) & (char(';') & ref0(wsOpt) & ref0(typeMember)).star();
//
// Parser typeMember() =>
//     ref0(propertySignature) |
//     ref0(callSignature) |
//     ref0(constructSignature) |
//     ref0(indexSignature) |
//     ref0(methodSignature);
//
// Parser propertySignature() =>
//     ref0(propertyName) & char('?').optional() & ref0(wsOpt) & ref0(typeAnnotation).optional();
//
// Parser propertyName() => ref0(identifier) | ref0(stringLiteral) | ref0(numericLiteral);
//
// Parser callSignature() =>
//     (ref0(typeParameters) & ref0(wsOpt)).optional() &
//     char('(') &
//     ref0(wsOpt) &
//     (ref0(parameterList) & ref0(wsOpt)).optional() &
//     char(')') &
//     ref0(wsOpt) &
//     ref0(typeAnnotation);
//
// Parser parameterList() =>
//     ref0(requiredParameterList) |
//     ref0(optionalParameterList) |
//     ref0(restParameter) |
//     (ref0(requiredParameterList) & ref0(comma) & ref0(optionalParameterList)) |
//     (ref0(requiredParameterList) & ref0(comma) & ref0(restParameter)) |
//     (ref0(optionalParameterList) & ref0(comma) & ref0(restParameter)) |
//     (ref0(requiredParameterList) & ref0(comma) & ref0(optionalParameterList) & ref0(comma) & ref0(restParameter));
//
// Parser requiredParameterList() =>
//     ref0(requiredParameter) & (ref0(comma) & ref0(requiredParameter)).star() & ref0(wsOpt);
//
// Parser requiredParameter() =>
//     (ref0(accessLevel).optional() & ref0(identifier) & ref0(typeAnnotation)) |
//     (ref0(identifier) & char(':') & ref0(wsOpt) & ref0(stringLiteral));
//
// Parser optionalParameterList() =>
//     ref0(optionalParameter) & (ref0(comma) & ref0(optionalParameter).star()) & ref0(wsOpt);
//
// Parser optionalParameter() =>
//     (ref0(accessLevel).optional() & ref0(identifier) & char('?') & ref0(typeAnnotation)) |
//     (ref0(accessLevel).optional() & ref0(identifier) & ref0(typeAnnotation).optional() & ref0(initializer));
//
// Parser initializer() => ref0(equals) & ref0(literalValue);
//
// Parser restParameter() => string('...') & ref0(identifier) & ref0(typeAnnotation).optional() & ref0(wsOpt);
//
// Parser constructSignature() => string('new') & ref0(wsOpt) & ref0(callSignature);
//
// Parser indexSignature() =>
//     (char('[') & ref0(wsOpt)).optional() &
//     ref0(identifier) &
//     ref0(wsOpt) &
//     char(':') &
//     ref0(wsOpt) &
//     (string('string') | string('number')) &
//     ref0(rBrace) &
//     ref0(typeAnnotation);
//
// Parser methodSignature() =>
//     ((string('new') & ref0(ws)) | string('new(')).not() &
//     ref0(propertyName) &
//     char('?').optional() &
//     ref0(wsOpt) &
//     ref0(callSignature);
//
// Parser typeAnnotation() => ref0(wsOpt) & char(':') & ref0(ws) & ref0(type);
//
// Parser interfaceDeclaration() =>
//     string('interface') &
//     ref0(ws) &
//     ref0(identifier) &
//     ((ref0(typeParameters) & ref0(ws)).optional() | ref0(wsOpt)) &
//     (ref0(interfaceExtendsClause) & ref0(ws)).optional() &
//     ref0(objectType);
//
// Parser interfaceExtendsClause() => string('extends') & ref0(ws) & ref0(classOrInterfaceTypeList);
//
// Parser classOrInterfaceTypeList() => ref0(typeReference) & (ref0(comma) & ref0(typeReference)).star() & ref0(wsOpt);
//
// Parser classHeritage() => ref0(classExtendsClause).optional() & ref0(implementsClause).optional();
//
// Parser classExtendsClause() => string('extends') & ref0(ws) & ref0(typeReference);
//
// Parser implementsClause() => string('implements') & ref0(ws) & ref0(classOrInterfaceTypeList);
//
// Parser declarationElement() =>
//     (ref0(exportAssignment) & ref0(wsOpt)) |
//     ((string('export') & ref0(ws)).optional() & ref0(interfaceDeclaration) & ref0(wsOpt)) |
//     ((string('export') & ref0(ws)).optional() & ref0(importDeclaration) & ref0(wsOpt)) |
//     ((string('export') & ref0(ws)).optional() & ref0(externalImportDeclaration) & ref0(wsOpt)) |
//     ((string('export') & ref0(ws)).optional() & ref0(ambientDeclaration) & ref0(wsOpt));
//
// Parser importDeclaration() =>
//     string('import') & ref0(ws) & ref0(identifier) & ref0(equals) & ref0(qualifiedIdentifier) & char(';');
//
// Parser externalImportDeclaration() =>
//     string('import') & ref0(ws) & ref0(identifier) & ref0(equals) & ref0(externalModuleReference) & char(';');
//
// Parser externalModuleReference() => string('require') & ref0(lParen) & ref0(stringLiteral) & ref0(rParen);
//
// Parser exportAssignment() => string('export') & ref0(equals) & ref0(identifier) & char(';');
//
// Parser ambientDeclaration() =>
//     (string('declare') & ref0(ws) & ref0(ambientVariableDeclaration)) |
//     (string('declare') & ref0(ws) & ref0(ambientFunctionDeclaration)) |
//     (string('declare') & ref0(ws) & ref0(ambientClassDeclaration)) |
//     (string('declare') & ref0(ws) & ref0(ambientEnumDeclaration)) |
//     (string('declare') & ref0(ws) & ref0(ambientModuleDeclaration)) |
//     (string('declare') & ref0(ws) & ref0(ambientExternalModuleDeclaration));
//
// Parser ambientVariableDeclaration() =>
//     string('var') &
//     ref0(ws) &
//     ref0(identifier) &
//     ref0(typeAnnotation).optional() &
//     (ref0(wsOpt) & char(';')).optional();
//
// Parser ambientFunctionDeclaration() =>
//     string('function') & ref0(ws) & ref0(identifier) & ref0(wsOpt) & ref0(callSignature) & char(';');
//
// Parser ambientClassDeclaration() =>
//     string('class') &
//     ref0(ws) &
//     ref0(identifier) &
//     ref0(typeParameters).optional() &
//     ref0(classHeritage) &
//     char('{') &
//     ref0(ambientClassBody) &
//     char('}');
//
// Parser ambientClassBody() => ref0(ambientClassBodyElement).star();
//
// Parser ambientClassBodyElement() =>
//     ref0(ambientConstructorDeclaration) | ref0(ambientPropertyMemberDeclaration) | ref0(indexSignature);
//
// Parser ambientConstructorDeclaration() =>
//     string('constructor') & ref0(ws) & char('(') & ref0(parameterList).optional() & char(')') & char(';');
//
// Parser ambientPropertyMemberDeclaration() =>
//     (ref0(accessLevel).optional() &
//     (string('static') & ref0(ws)).optional() &
//     ref0(propertyName) &
//     ref0(typeAnnotation).optional() &
//     char(';')) |
//     (ref0(accessLevel).optional() &
//     (string('static') & ref0(ws)).optional() &
//     ref0(propertyName) &
//     ref0(callSignature) &
//     char(';'));
//
// Parser ambientEnumDeclaration() =>
//     string('enum') & ref0(identifier) & char('{') & ref0(ambientEnumBody).optional() & char('}');
//
// Parser ambientEnumBody() =>
//     ref0(ambientEnumMember) & (char(',') & ref0(ambientEnumMember)).star() & char(',').optional();
//
// Parser ambientEnumMember() => ref0(propertyName) & (ref0(equals) & pattern(r'[0-9]+|0x\p{XDigit}+'));
//
// Parser ambientModuleDeclaration() =>
//     string('module') &
//     ref0(ws) &
//     ref0(qualifiedIdentifier) &
//     ref0(wsOpt) &
//     char('{') &
//     ref0(ambientModuleBody) &
//     char('}');
//
// Parser ambientModuleBody() => (ref0(wsOpt) & ref0(ambientModuleElement)).star() & ref0(wsOpt);
//
// Parser ambientModuleElement() =>
//     ((string('export') & ref0(ws)).optional() & ref0(ambientVariableDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(ambientFunctionDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(ambientClassDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(ambientEnumDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(ambientModuleDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(ambientExternalModuleDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(interfaceDeclaration)) |
//     ((string('export') & ref0(ws)).optional() & ref0(importDeclaration));
//
// Parser ambientExternalModuleDeclaration() =>
//     string('module') & ref0(stringLiteral) & char('{') & ref0(ambientExternalModuleBody) & char('}');
//
// Parser ambientExternalModuleBody() => ref0(ambientExternalModuleElement).star();
//
// Parser ambientExternalModuleElement() =>
//     ref0(ambientModuleElement) |
//     ref0(exportAssignment) |
//     (string('export') & ref0(ws) & ref0(externalImportDeclaration));
//
