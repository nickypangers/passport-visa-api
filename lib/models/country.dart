import 'package:equatable/equatable.dart';
// ignore: depend_on_referenced_packages
import 'package:json_annotation/json_annotation.dart';

part 'country.g.dart';

@JsonSerializable()
class Country extends Equatable {
  final String name, code;

  Country({required this.name, required this.code});

  factory Country.fromJson(Map<String, dynamic> json) =>
      _$CountryFromJson(json);

  Map<String, dynamic> toJson() => _$CountryToJson(this);

  factory Country.fromCsv(String csv, {String delimiter = ','}) {
    var data = csv.split(delimiter);
    return Country(name: data[0], code: data[1]);
  }

  @override
  List<Object?> get props => [name, code];
}
