// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'category.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Category _$CategoryFromJson(Map<String, dynamic> json) => Category(
      data:
          (json['data'] as List<dynamic>?)?.map((e) => e as String).toList() ??
              const [],
      length: json['length'] as int? ?? 0,
    );

Map<String, dynamic> _$CategoryToJson(Category instance) => <String, dynamic>{
      'data': instance.data,
      'length': instance.length,
    };
