FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} stocks-webservice-1.0.0.jar
ENTRYPOINT ["java","-jar","/stocks-webservice-1.0.0.jar"]

EXPOSE 8080
