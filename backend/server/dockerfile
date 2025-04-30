FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Копируем конкретный файл вместо wildcard
COPY libs/server-1.0.0.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]