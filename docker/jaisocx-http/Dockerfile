FROM jaisocx/webserver:amd64.latest # amd64 CPU Architecture, when not working, I have one more docker build, with arm64/v8
# FROM jaisocx/webserver:mac.3.0.14 # arm64/v8 CPU Architecture

WORKDIR /usr/lib/jaisocx-http

CMD "java" "-Xms${JAVA_XMS}" "-Xmx${JAVA_XMX}" "-jar" "out/artifacts/jaisocx_http_jar/jaisocx-http.jar" "-nogui"

EXPOSE 443
EXPOSE 80

