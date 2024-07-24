#FROM lhammer/private:maven AS MAVEN_BUILD
#MAINTAINER Lennard
#COPY pom.xml /build/
#COPY src /build/src/
#COPY .m2 /build/.m2/
#WORKDIR /build/
#RUN mvn clean install && mvn package

FROM amazoncorretto:17-alpine
COPY /target/*.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
