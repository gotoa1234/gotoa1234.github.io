@echo off
setlocal

REM 1. 輸入來源分支
set /p source_branch="Enter source branch name: "

REM 2. 輸入目標分支
set /p target_branch="Enter target branch name: "

REM 3. 找出"來源分支"不在"目標分支"的簽入
for /f "tokens=*" %%i in ('git cherry %target_branch% %source_branch% ^| findstr /B "+"') do (
    set "commit=%%i"
	REM 4-1. 呼叫比對函式
    call :process_commit 
)

REM 5. 找完後等待跳出
endlocal
pause 
exit /b

REM 4-2. 執行比對
:process_commit
REM 4-3. 提取出簽入的 Git Hash
for /f "tokens=2" %%a in ("%commit%") do (
    set "commit_hash=%%a"
)

REM 4-4. 找出的來源 Git Hash 比對是否在 目標的Log中出現
git log %target_branch% | findstr /C:"%commit_hash%" >nul
if %errorlevel%==0 (
    echo Commit %commit_hash% has been cherry-picked.
) else (
    echo Commit %commit_hash% has not been cherry-picked.
)
exit /b