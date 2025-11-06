@echo off
echo Starting Luminaris AI Development Environment...
echo.
echo Starting Frontend (Vite) and Backend (Express API)...
echo.
start "Luminaris Frontend" cmd /k "npm.cmd run dev"
timeout /t 2 /nobreak >nul
start "Luminaris Backend" cmd /k "npm.cmd run api"
echo.
echo Both servers are starting in separate windows...
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:3001
echo.
pause
