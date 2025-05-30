#!/bin/bash

# Функция для проверки Docker
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo -e "\033[31mОШИБКА: Docker не запущен!\033[0m"
        exit 1
    fi
}

# Проверка перед запуском
check_docker

echo -e "\033[32mПопытка загрузки образа Java...\033[0m"
if ! docker pull eclipse-temurin:21-jdk-alpine; then
    echo -e "\033[33mИспользуем альтернативный образ...\033[0m"
    docker pull eclipse-temurin:21-jdk-jammy
    sed -i 's/eclipse-temurin:21-jdk-alpine/eclipse-temurin:21-jdk-jammy/' Dockerfile
fi

echo -e "\033[32mЗапуск Docker Compose...\033[0m"
docker compose up --build || {
    echo -e "\033[31mОшибка при запуске Docker Compose\033[0m"
    exit 1
}