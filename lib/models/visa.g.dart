// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'visa.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Visa _$VisaFromJson(Map<String, dynamic> json) => Visa(
      passport: json['passport'] as String,
      destination: json['destination'] as String,
      dur: json['dur'] as String,
      status: json['status'] as String,
      category: json['category'] as String,
      lastUpdated: json['last_updated'] as String,
      error: Error.fromJson(json['error'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$VisaToJson(Visa instance) => <String, dynamic>{
      'passport': instance.passport,
      'destination': instance.destination,
      'dur': instance.dur,
      'status': instance.status,
      'category': instance.category,
      'last_updated': instance.lastUpdated,
      'error': instance.error,
    };
