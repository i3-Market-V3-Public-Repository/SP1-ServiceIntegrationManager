import 'annotation.dart';
import 'method.dart';

class Class {
  String documentation;
  List<Annotation> annotations;
  String name;
  List<String> variables;
  Constructor constructor;
  List<Method> methods;

  Class({
    required this.documentation,
    required this.annotations,
    required this.name,
    required this.variables,
    required this.constructor,
    required this.methods,
  });

  @override
  String toString() => '$documentation\n'
      '${annotations.join('\n')}\n'
      'export class $name {\n'
      '${variables.join('\n')}\n'
      '$constructor\n'
      '${methods.join('\n')}\n'
      '}\n';
}
