#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Запуск сборки проекта (gradlew build)...${NC}"
./gradlew build

# Проверка успешности сборки
if [ $? -ne 0 ]; then
    echo -e "${RED}Ошибка при сборке проекта!${NC}"
    read -p "Нажмите Enter для продолжения..."
    exit 1
fi

echo -e "${GREEN}Сборка завершена. Запуск Docker Compose...${NC}"

# Определяем команду docker compose (новая/старая версия)
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

$COMPOSE_CMD up --build

# Проверка успешности запуска
if [ $? -ne 0 ]; then
    echo -e "${RED}Ошибка при запуске контейнеров!${NC}"
    read -p "Нажмите Enter для продолжения..."
    exit 1
fi

echo -e "${GREEN}Успех! Приложение и контейнеры запущены.${NC}"
read -p "Нажмите Enter для завершения..."