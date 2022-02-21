import 'class.dart';
import 'import.dart';

class Controller {
  ImportSection imports;
  Class classDefinition;

  Controller(this.imports, this.classDefinition);

  @override
  String toString() => '${imports.join('\n')}\n\n$classDefinition';
}