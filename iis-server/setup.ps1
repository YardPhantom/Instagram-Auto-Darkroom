$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

New-Item -ItemType Directory -Force -Path ".\logs" | Out-Null
New-Item -ItemType Directory -Force -Path "C:\projects\InstagramAuto" | Out-Null
New-Item -ItemType Directory -Force -Path "C:\projects\InstagramAuto\done" | Out-Null

if (-not (Test-Path ".\config.json")) {
  Copy-Item ".\config.example.json" ".\config.json"
}

if (-not (Get-Command py -ErrorAction SilentlyContinue) -and -not (Get-Command python -ErrorAction SilentlyContinue)) {
  Write-Error "Python 3.11+ is required. Install it, then run setup.ps1 again."
}

$python = "python"
if (Get-Command py -ErrorAction SilentlyContinue) { $python = "py -3" }

if (-not (Test-Path ".\.venv")) {
  Invoke-Expression "$python -m venv .venv"
}

& ".\.venv\Scripts\python.exe" -m pip install --upgrade pip
& ".\.venv\Scripts\pip.exe" install -r requirements.txt

Write-Host "Darkroom is ready. Point an IIS 10 site at this folder (HttpPlatformHandler required), or run run.bat for a local server."
