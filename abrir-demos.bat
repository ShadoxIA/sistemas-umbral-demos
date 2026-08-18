@echo off
chcp 65001 >nul
title Demos Sistemas Umbral
cd /d "%~dp0"

echo.
echo   ============================================================
echo    DEMOS SISTEMAS UMBRAL
echo   ============================================================
echo.

REM --- Buscar Python ---
set PY=
where py >nul 2>&1 && set PY=py
if "%PY%"=="" ( where python >nul 2>&1 && set PY=python )
if "%PY%"=="" (
  echo   No encontre Python en esta PC.
  echo.
  echo   No pasa nada: podes abrir las demos con doble clic en
  echo   demo-odontologia\index.html
  echo.
  echo   El servidor solo hace falta para verlas desde el celular.
  echo   Si lo queres, instala Python desde https://python.org
  echo.
  pause
  exit /b 1
)

REM --- IP de la red local, para el celular ---
set IP=
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
  if "%IP%"=="" set IP=%%a
)
set IP=%IP: =%

echo    En esta PC:
echo      http://localhost:8777/demo-odontologia/index.html
echo.
if not "%IP%"=="" (
  echo    Desde el celular ^(mismo WiFi que esta PC^):
  echo      http://%IP%:8777/demo-odontologia/index.html
  echo.
)
echo   ------------------------------------------------------------
echo    Para cortar el servidor: Ctrl+C, o cerra esta ventana.
echo   ------------------------------------------------------------
echo.

start "" "http://localhost:8777/demo-odontologia/index.html"

REM 0.0.0.0 = escucha tambien en la red local, no solo en esta PC
%PY% -m http.server 8777 --bind 0.0.0.0
