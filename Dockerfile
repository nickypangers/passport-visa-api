FROM dart:stable as build
COPY . /passport_visa_api
WORKDIR /passport_visa_api
RUN mkdir build
RUN dart pub get
RUN dart run test
RUN dart compile exe ./bin/passport_visa_api.dart -o ./build/dartserve


FROM scratch
COPY --from=build /passport_visa_api/build /bin
COPY --from=build /runtime/ /

EXPOSE 8080
CMD ["dartserve"]