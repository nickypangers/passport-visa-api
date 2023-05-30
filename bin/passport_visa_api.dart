import 'dart:io';

import 'package:passport_visa_api/service/router_service.dart';

Future<void> main(List<String> arguments) async {
  // String? address;
  int? port = int.tryParse(Platform.environment['PORT'] ?? '');

  HttpServer server;

  if (port != null) {
    server = await RouterService().createServer(port: port);
  } else {
    server = await RouterService().createServer();
  }

  server.autoCompress = true;

  print('Serving at http://${server.address.host}:${server.port}');
}
