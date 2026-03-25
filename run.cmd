rem 控制台、powershell 执行
$env:Path = "C:\Program Files\nvm\v22.2.0;$env:Path"

rem cmd 脚本执行
set "Path=C:\Program Files\nvm\v22.2.0;%Path%"

node --version

npm run dev