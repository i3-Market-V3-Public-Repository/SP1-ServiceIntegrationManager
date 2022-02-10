import 'annotation.dart';

class Method {
  String documentation;
  List<Annotation> annotations;
  bool async;
  String name;
  List<Parameter> parameters;
  String returnType;
  String body;

  Method({
    required this.documentation,
    required this.annotations,
    required this.name,
    required this.parameters,
    required this.returnType,
    required this.body,
    this.async = true,
  });

  @override
  String toString() => '$documentation\n'
      '${annotations.join('\n')}\n'
      '${async ? 'async ' : ''}$name(${parameters.join(', ')}): $returnType {\n'
      '$body\n'
      '}\n';
}

class Parameter {
  Annotation? annotation;
  String name;
  String type;

  Parameter({this.annotation, required this.name, required this.type});

  @override
  String toString() => '${annotation ?? ""} $name: $type';
}

class ConstructorParameter extends Parameter {
  String visibilitySpecifier;

  ConstructorParameter(
      {Annotation? annotation, required this.visibilitySpecifier, required String name, required String type})
      : super(annotation: annotation, name: name, type: type);

  @override
  String toString() => '${annotation ?? ""} $visibilitySpecifier $name: $type';
}

class Constructor {
  List<ConstructorParameter> parameters;
  String body;

  Constructor(this.parameters, this.body);

  @override
  String toString() => 'constructor (${parameters.join(',\n')}) {\n'
      '$body}';
}
