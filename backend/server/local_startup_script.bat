@echo off
REM Скрипт для сборки и запуска Spring Boot + Docker

echo Запуск сборки проекта (gradlew build)...
call .\gradlew build

REM Проверка успешности сборки
if %errorlevel% neq 0 (
    echo Ошибка при сборке проекта! Код выхода: %errorlevel%
    pause
    exit /b %errorlevel%
)

echo Сборка завершена. Запуск Docker Compose...
call docker-compose up --build

REM Проверка успешности запуска
if %errorlevel% neq 0 (
    echo Ошибка при запуске контейнеров! Код выхода: %errorlevel%
    pause
    exit /b %errorlevel%
)

echo Успех! Приложение и контейнеры запущены.
pause