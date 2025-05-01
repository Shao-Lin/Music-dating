FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY libs/*.jar app.jar
EXPOSE 8088 
ENTRYPOINT ["java", "-jar", "app.jar"]