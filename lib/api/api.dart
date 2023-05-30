import 'dart:io';

import 'package:passport_visa_api/repository/data_repository.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class Api {
  Future<Response> _getDestinationInfo(
          Request req, String cc, String dd) async =>
      await DataRepository()
          .getDestinationInfo(cc: cc, dd: dd)
          .then((res) => Response.ok(res, headers: {
                'Content-Type': ContentType.json.toString(),
              }))
          .catchError((e) => Response.internalServerError(body: e));

  Future<Response> _getPassportInfo(Request req, String cc) async =>
      await DataRepository()
          .getPassportInfo(cc)
          .then((res) => Response.ok(res, headers: {
                'Content-Type': ContentType.json.toString(),
              }))
          .catchError((e) => Response.internalServerError(body: e));

  Router get router {
    final router = Router();

    router.get('/<cc>/<dd>', _getDestinationInfo);
    router.get('/<cc>', _getPassportInfo);

    return router;
  }
}
