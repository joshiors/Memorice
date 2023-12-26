@echo off
powershell.exe -Command "Start-Process powershell -ArgumentList '-ExecutionPolicy Unrestricted -File \"%~dp0script.ps1\"' -Verb RunAs"