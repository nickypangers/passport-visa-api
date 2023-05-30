import 'package:equatable/equatable.dart';
// ignore: depend_on_referenced_packages
import 'package:json_annotation/json_annotation.dart';
import 'models.dart';

part 'passport.g.dart';

@JsonSerializable()
class Passport extends Equatable {
  final String passport, lastUpdated;
  final Category vr, voa, vf, cb, na;
  final Error error;

  Passport({
    required this.passport,
    required this.lastUpdated,
    required this.vr,
    required this.voa,
    required this.vf,
    required this.cb,
    required this.na,
    required this.error,
  });

  factory Passport.hasError(String message) => Passport(
        passport: '',
        lastUpdated: DateTime.now().toIso8601String(),
        vr: Category(),
        voa: Category(),
        vf: Category(),
        cb: Category(),
        na: Category(),
        error: Error(error: message, status: true),
      );

  factory Passport.fromJson(Map<String, dynamic> json) =>
      _$PassportFromJson(json);

  Map<String, dynamic> toJson() => _$PassportToJson(this);

  @override
  List<Object?> get props =>
      [passport, lastUpdated, vr, voa, vf, cb, na, error];
}
