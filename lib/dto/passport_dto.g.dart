// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'passport_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PassportDto _$PassportDtoFromJson(Map<String, dynamic> json) => PassportDto(
      code: json['code'] as String,
      dur: json['dur'] as String? ?? '',
      text: json['text'] as String,
      textUrl: json['textUrl'] as String? ?? '',
      textCol: json['textCol'] as int? ?? 0,
    );

Map<String, dynamic> _$PassportDtoToJson(PassportDto instance) =>
    <String, dynamic>{
      'code': instance.code,
      'dur': instance.dur,
      'text': instance.text,
      'textUrl': instance.textUrl,
      'textCol': instance.textCol,
    };
