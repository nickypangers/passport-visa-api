import 'dart:io';

import 'package:passport_visa_api/api/api.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

class RouterService {
  Router get _handler {
    final Router router = Router();

    router.mount('/api/', Api().router);

    return router;
  }

  Future<HttpServer> createServer(
      {String address = '0.0.0.0', int port = 8080}) async {
    return await shelf_io.serve(_handler, address, port);
  }
}
