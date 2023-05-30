import 'package:equatable/equatable.dart';
// ignore: depend_on_referenced_packages
import 'package:json_annotation/json_annotation.dart';
import 'error.dart';

part 'visa.g.dart';

@JsonSerializable()
class Visa extends Equatable {
  final String passport, destination, dur, status, category, lastUpdated;
  final Error error;

  Visa({
    required this.passport,
    required this.destination,
    required this.dur,
    required this.status,
    required this.category,
    required this.lastUpdated,
    required this.error,
  });

  factory Visa.hasError(String message) => Visa(
        passport: '',
        destination: '',
        dur: '',
        status: '',
        category: '',
        lastUpdated: DateTime.now().toIso8601String(),
        error: Error(error: message, status: true),
      );

  factory Visa.fromJson(Map<String, dynamic> json) => _$VisaFromJson(json);

  Map<String, dynamic> toJson() => _$VisaToJson(this);

  @override
  List<Object?> get props =>
      [passport, destination, dur, status, category, lastUpdated, error];
}
