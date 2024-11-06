@echo off
Net session >nul 2>&1 || mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0","","runas",1)(window.close)&&exit
echo.


:: 创建一个显示磁盘列表的脚本并立即删除
echo list disk > listdisk.txt
diskpart /s listdisk.txt | findstr /v /i "Microsoft Copyright" > disklist.txt
del listdisk.txt

:: 显示磁盘列表
type disklist.txt

:: 获取用户输入的磁盘编号
set /p disknum=请输入硬盘编号（例如：1）： 

:: 验证用户输入的磁盘编号是否有效
diskpart /s listdisk.txt | findstr "磁盘 %disknum% " > nul
if %errorlevel% neq 0 (
    msg * 你指定的磁盘无效。请重新运行脚本并选择一个有效的磁盘。
    del disklist.txt
    goto cleanup
)
del disklist.txt

:: 创建一个包含选择磁盘和 offline/online 的脚本并立即删除
(
echo select disk %disknum%
echo offline disk
echo online disk
) > diskpartscript.txt

:: 运行 diskpart 脚本
diskpart /s diskpartscript.txt
del diskpartscript.txt

:: 提示用户操作完成
msg * 操作完成，请再次尝试弹出移动硬盘.


:cleanup
:: 删除临时文件
for %%f in (%TEMP_FILES%) do if exist %%f del %%f

:end
