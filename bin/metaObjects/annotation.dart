class Annotation {
  String name;
  List<String> parameters;

  Annotation({required this.name, required this.parameters});

  @override
  String toString() => '@$name(${parameters.join(', ')})';
}
