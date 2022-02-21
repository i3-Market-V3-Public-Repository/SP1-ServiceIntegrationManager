import 'package:petitparser/petitparser.dart';
import 'package:petitparser/reflection.dart';
import 'package:test/test.dart';
import 'package:tuple/tuple.dart';

import '../bin/parsers/type_parser.dart';

void main() {
  final parser = TypeDefinition().build().end();

  test('Check grammar correctness', () {
    expect(linter(parser), isEmpty);
  });

  group('Predefined types', () {
    final types = ['any', 'number', 'string', 'boolean', 'void', 'unknown'];
    for (final type in types) {
      test('Predefined type "$type"', () {
        final result = parser.parse(type);
        expect(result, isA<Success>(), reason: result.toString());
      });
    }
  });

  group('Array types', () {
    test('Single Array', () {
      final result = parser.parse('number[]');
      expect(result, isA<Success>(), reason: result.toString());
    });
    test('Bi-dimensional Array', () {
      final result = parser.parse('number[][]');
      expect(result, isA<Success>(), reason: result.toString());
    });
  });

  group('Reference types', () {
    group('Non-parameterized reference types', () {
      final types = [
        Tuple2('Normal type reference', 'NormalTypeRef'),
        Tuple2('Type reference with module', 'Module.TypeRef'),
        Tuple2('Type reference with modules', 'Module.Submodule.TypeRef'),
      ];
      for (final type in types) {
        test(type.item1, () {
          final result = parser.parse(type.item2);
          expect(result, isA<Success>(), reason: result.toString());
        });
      }
    });

    group('Parameterized reference types', () {
      final types = [
        Tuple2('Type reference with predefined parameter', 'TypeRef<string>'),
        Tuple2('Type reference with reference parameter', 'TypeRef<TypeRef2>'),
        Tuple2('Type reference with reference parameter with module', 'TypeRef<Module.Submodule.TypeRef2>'),
        Tuple2('Type reference with modules with predefined parameter', 'Module.Submodule.TypeRef<string>'),
        Tuple2('Type reference with modules with reference parameter', 'Module.Submodule.TypeRef<TypeRef2>'),
        Tuple2('Type reference with modules with reference parameter with module',
            'Module.Submodule.TypeRef<Module2.Submodule.TypeRef2>'),
      ];
      for (final type in types) {
        test(type.item1, () {
          final result = parser.parse(type.item2);
          expect(result, isA<Success>(), reason: result.toString());
        });
      }
    });
  });

  group('Reference Array types', () {
    final types = [
      Tuple2('Array of reference types', 'TypeRef<TypeParam>[]'),
      Tuple2('Reference type of array parameter', 'TypeRef<TypeParam[]>'),
      Tuple2('Array of reference type with array parameter', 'TypeRef<TypeParam[]>[]'),
      Tuple2('Array of reference type with array parameter and submodules',
          'Module.Submodule.TypeRef<Module.Submodule.TypeParam[]>[]'),
    ];
    for (final type in types) {
      test(type.item1, () {
        final result = parser.parse(type.item2);
        expect(result, isA<Success>(), reason: result.toString());
      });
    }
  });

  group('Union types', () {
    final types = [
      Tuple2('Union of types', 'Type | Type2 | Type3'),
      Tuple2('Union of array types', 'Type[] | Type2 | Type3[]'),
      Tuple2('Array of Union types', '(Type | Type2)[]'),
      Tuple2('Array of Union of array types', '(Type[] | Type2[])[]'),
      Tuple2('Union of Parameterized Types', '(Type<TypeParam> | Type2<TypeParam2>)'),
      Tuple2('Union of Parameterized Types and arrays', '(Type<TypeParam> | Type2[] | Type3<TypeParam3>[])[]'),
    ];
    for (final type in types) {
      test(type.item1, () {
        final result = parser.parse(type.item2);
        expect(result, isA<Success>(), reason: result.toString());
      });
    }
  });

}
