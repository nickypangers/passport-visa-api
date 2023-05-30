import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:passport_visa_api/dto/passport_dto.dart';

class PassportService {
  static const _endpoint = 'https://www.passportindex.org/incl/compare2.php';

  final _dio = Dio();

  Future<List<PassportDto>> getCountryAllData(String cc) async {
    _dio.options.headers['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8';
    _dio.options.headers['origin'] = 'https://www.passportindex.org';
    _dio.options.headers['referer'] =
        'https://www.passportindex.org/comparebyPassport.php';
    _dio.options.headers['host'] = 'www.passportindex.org';
    _dio.options.headers['X-Requested-With'] = 'XMLHttpRequest';

    var formData = FormData.fromMap({
      'compare': '3',
      'year': '${DateTime.now().year}',
      'cc': cc,
    });

    var response =
        await _dio.post(_endpoint, data: formData).catchError((error) {
      throw Error();
    });

    return (jsonDecode(response.data) as List<dynamic>)
        .map((v) => PassportDto.fromJson(v))
        .toList();
  }
}
