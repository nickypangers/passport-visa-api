import 'dart:convert';

import 'package:passport_visa_api/models/models.dart';
import 'package:passport_visa_api/models/models.dart';
import 'package:passport_visa_api/service/passport_service.dart';

import '../dto/passport_dto.dart';

class DataRepository {
  Future<String> getDestinationInfo(
      {required String cc, required String dd}) async {
    try {
      List<PassportDto?> res = await PassportService().getCountryAllData(cc);
      var data = res.firstWhere(
          (element) => element?.code.toLowerCase() == dd.toLowerCase());

      var status = 'voa';
      switch (data!.text) {
        case 'visa-free':
        case 'eVisa':
        case 'visa-free (EASE)':
          status = 'vf';
          break;
        case 'visa required':
          status = 'vr';
          break;
        default:
          break;
      }

      return jsonEncode(Visa(
          passport: cc.toUpperCase(),
          destination: dd.toUpperCase(),
          dur: data.dur,
          status: status.toUpperCase(),
          category: data.text,
          lastUpdated: DateTime.now().toIso8601String(),
          error: Error(status: false, error: '')));
    } catch (e) {
      return jsonEncode(Visa.hasError('$e'));
    }
  }

  Future<String> getPassportInfo(String cc) async {
    try {
      var res = await PassportService().getCountryAllData(cc);
      List<String> vr = [], voa = [], vf = [];
      for (var e in res) {
        switch (e.text) {
          case 'visa-free':
          case 'eVisa':
          case 'visa-free (EASE)':
            vf.add(e.code);
            break;
          case 'visa required':
            vr.add(e.code);
            break;
          default:
            voa.add(e.code);
            break;
        }
      }

      var passport = Passport(
          passport: cc.toUpperCase(),
          lastUpdated: DateTime.now().toIso8601String(),
          vr: Category(data: vr, length: vr.length),
          voa: Category(data: voa, length: voa.length),
          vf: Category(data: vf, length: vf.length),
          cb: Category(data: [], length: 0),
          na: Category(data: [], length: 0),
          error: Error(error: '', status: false));

      return jsonEncode(passport.toJson());
    } catch (e) {
      return jsonEncode('$e');
    }
  }
}
