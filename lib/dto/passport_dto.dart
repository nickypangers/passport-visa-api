import 'package:equatable/equatable.dart';
// ignore: depend_on_referenced_packages
import 'package:json_annotation/json_annotation.dart';
part 'passport_dto.g.dart';

@JsonSerializable()
class PassportDto extends Equatable {
  final String code, dur, text, textUrl;
  final int textCol;

  PassportDto(
      {required this.code,
      this.dur = '',
      required this.text,
      this.textUrl = '',
      this.textCol = 0});

  factory PassportDto.fromJson(Map<String, dynamic> json) =>
      _$PassportDtoFromJson(json);

  Map<String, dynamic> toJson() => _$PassportDtoToJson(this);

  @override
  List<Object?> get props => [code, dur, text, textUrl, textCol];

  @override
  String toString() =>
      '{code: $code, dur: $dur, text: $text, textUrl: $textUrl, textCol: $textCol}';
}
