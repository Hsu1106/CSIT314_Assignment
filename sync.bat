@echo off
REM Double-click to sync with GitHub: pull -> test -> commit -> push
cd /d "%~dp0"

echo ===== 1. Pull latest changes =====
git pull --rebase --autostash
if errorlevel 1 goto :error

echo.
echo ===== 2. Changed files =====
git status --short

echo.
echo ===== 3. Run tests =====
call npm test
if errorlevel 1 (
  echo.
  echo Tests FAILED - fix them before pushing.
  goto :end
)

echo.
set "MSG="
set /p "MSG=Commit message (leave empty to skip push): "
if "%MSG%"=="" (
  echo Skipped commit and push.
  goto :end
)

git add -A
git commit -m "%MSG%"
git push
if errorlevel 1 goto :error
echo.
echo ===== Done! Pushed to GitHub =====
goto :end

:error
echo.
echo Something went wrong. Copy the messages above and ask for help.

:end
pause
