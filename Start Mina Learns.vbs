' Launches Mina Learns silently (no terminal window)
Dim shell
Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\") - 1)

' Open browser after a short delay
shell.Run "cmd /c timeout /t 3 /nobreak >nul && start http://localhost:5173", 0, False

' Start the dev server (hidden window)
shell.Run "cmd /c npm run dev", 0, False
