@echo off
Net session >nul 2>&1 || mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0","","runas",1)(window.close)&&exit
echo.


:: ����һ����ʾ�����б�Ľű�������ɾ��
echo list disk > listdisk.txt
diskpart /s listdisk.txt | findstr /v /i "Microsoft Copyright" > disklist.txt
del listdisk.txt

:: ��ʾ�����б�
type disklist.txt

:: ��ȡ�û�����Ĵ��̱��
set /p disknum=������Ӳ�̱�ţ����磺1���� 

:: ��֤�û�����Ĵ��̱���Ƿ���Ч
diskpart /s listdisk.txt | findstr "���� %disknum% " > nul
if %errorlevel% neq 0 (
    msg * ��ָ���Ĵ�����Ч�����������нű���ѡ��һ����Ч�Ĵ��̡�
    del disklist.txt
    goto cleanup
)
del disklist.txt

:: ����һ������ѡ����̺� offline/online �Ľű�������ɾ��
(
echo select disk %disknum%
echo offline disk
echo online disk
) > diskpartscript.txt

:: ���� diskpart �ű�
diskpart /s diskpartscript.txt
del diskpartscript.txt

:: ��ʾ�û��������
msg * ������ɣ����ٴγ��Ե����ƶ�Ӳ��.


:cleanup
:: ɾ����ʱ�ļ�
for %%f in (%TEMP_FILES%) do if exist %%f del %%f

:end
