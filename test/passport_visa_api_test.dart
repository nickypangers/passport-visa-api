// import 'package:passport_visa_api/passport_visa_api.dart';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:passport_visa_api/models/models.dart';
import 'package:passport_visa_api/service/router_service.dart';
import 'package:test/test.dart';

void main() {
  HttpServer? server;
  String? baseUrl;
  Dio? dio;
  Response? response;

  setUp(() async {
    server = await RouterService().createServer(port: 8081);
    baseUrl = 'http://${server?.address.host}:${server?.port}';
    dio = Dio();
  });

  group('Get passport destination data', () {
    setUp(() async {
      response = await dio?.get('$baseUrl/api/hk/gb');
    });

    test('response successfully fetched', () async {
      expect(response != null, true);
    });

    test('response status ok', () async {
      expect(response?.statusCode, HttpStatus.ok);
    });

    test('response content type is json', () async {
      expect(response?.headers.map['Content-Type'],
          contains(ContentType.json.toString()));
    });

    test('response is type Visa', () async {
      var data = Visa.fromJson(response?.data);
      expect(data.runtimeType, Visa);
    });
  });

  group('Get passport data', () {
    setUp(() async => response = await dio?.get('$baseUrl/api/hk'));

    test('response successfully fetched', () async {
      expect(response != null, true);
    });

    test('response status ok', () async {
      expect(response?.statusCode, HttpStatus.ok);
    });

    test('response content type is json', () async {
      expect(response?.headers.map['Content-Type'],
          contains(ContentType.json.toString()));
    });

    test('response is type Passport', () async {
      var data = Passport.fromJson(response?.data);
      expect(data.runtimeType, Passport);
    });

    test('response number of countries is 198', () async {
      var data = Passport.fromJson(response?.data);
      var numOfCountries = data.vr.length +
          data.voa.length +
          data.vf.length +
          data.ev.length +
          data.cb.length +
          data.na.length;
      expect(numOfCountries, 198);
    });
  });

  tearDown(() async {
    await server?.close(force: true);
    dio?.close(force: true);
  });
}
