// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'passport.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Passport _$PassportFromJson(Map<String, dynamic> json) => Passport(
      passport: json['passport'] as String,
      lastUpdated: json['last_updated'] as String,
      vr: Category.fromJson(json['vr'] as Map<String, dynamic>),
      voa: Category.fromJson(json['voa'] as Map<String, dynamic>),
      vf: Category.fromJson(json['vf'] as Map<String, dynamic>),
      ev: Category.fromJson(json['ev'] as Map<String,dynamic>),
      cb: Category.fromJson(json['cb'] as Map<String, dynamic>),
      na: Category.fromJson(json['na'] as Map<String, dynamic>),
      error: Error.fromJson(json['error'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$PassportToJson(Passport instance) => <String, dynamic>{
      'passport': instance.passport,
      'last_updated': instance.lastUpdated,
      'vr': instance.vr,
      'voa': instance.voa,
      'vf': instance.vf,
      'ev': instance.ev,
      'cb': instance.cb,
      'na': instance.na,
      'error': instance.error,
    };
