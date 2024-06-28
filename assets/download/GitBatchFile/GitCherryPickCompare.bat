@echo off
setlocal

REM 1. Input source branch.
set /p source_branch="Enter source branch name: "

REM 2. Input target branch.
set /p target_branch="Enter target branch name: "

REM 3. Find out not in source branch committed.
for /f "tokens=*" %%i in ('git cherry %target_branch% %source_branch% ^| findstr /B "+"') do (
    set "commit=%%i"
	REM 4-1. Call compare method.
    call :process_commit 
)

REM 5. Wait break when find out finished.
endlocal
pause 
exit /b

REM 4-2. Execute compare method.
:process_commit
REM 4-3. Get committed git hash.
for /f "tokens=2" %%a in ("%commit%") do (
    set "commit_hash=%%a"
)

REM 4-4. Get Log of source branch committed git hash.
git log %target_branch% | findstr /C:"%commit_hash%" >nul
if %errorlevel%==0 (
    echo Commit %commit_hash% has been cherry-picked.
) else (
    echo Commit %commit_hash% has not been cherry-picked.
)
exit /b