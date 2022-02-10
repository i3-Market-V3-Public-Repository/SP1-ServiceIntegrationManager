import 'dart:collection';

class ImportStatement {
  Set<String> importedElements;
  String sourcePath;

  ImportStatement(Iterable<String> importedElements, String sourcePath, {bool surroundSource = true})
      : importedElements = SplayTreeSet.of(importedElements),
        sourcePath = surroundSource ? "'$sourcePath'" : sourcePath;

  bool merge(ImportStatement other) {
    if (other.sourcePath == sourcePath) {
      importedElements.addAll(other.importedElements);
      return true;
    }
    return false;
  }

  @override
  String toString() => "import {${importedElements.join(', ')}} from $sourcePath;";
}

typedef ImportSection = List<ImportStatement>;

extension ImportSectionExt on List<ImportStatement> {
  static ImportSection fromDynamic(dynamic source) => (source as List).cast<ImportStatement>();

  ImportSection merge() {
    final newSection = <ImportStatement>[];
    for (final statement in this) {
      bool added = false;
      for (final existingStatement in newSection) {
        if (existingStatement.merge(statement)) {
          added = true;
          break;
        }
      }
      if (!added) newSection.add(statement);
    }
    return newSection;
  }
}
