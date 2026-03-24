# Синхронизация портфолио из корневой папки кейсов → public/projects
# Источник (как у вас на диске): Marub\1\проекты
# Запуск из любой папки:
#   powershell -ExecutionPolicy Bypass -File "kimi2/app/scripts/sync-gallery-from-source.ps1"
# Или из app:  powershell -File ./scripts/sync-gallery-from-source.ps1

$ErrorActionPreference = 'Stop'
# PSScriptRoot = kimi2/app/scripts → родитель = app (где лежит public/)
$appRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
# Из app: ../.. = корень Marub → 1/проекты
$srcRoot = Join-Path $appRoot '..\..\1\проекты'
if (-not (Test-Path -LiteralPath $srcRoot)) {
  Write-Error "Не найдена папка с кейсами: $srcRoot`nОжидается: ...\Marub\1\проекты (Москва, поляки)"
}
$pub = Join-Path $appRoot 'public\projects'

# поляки → public/projects/polaki/{1,2,3}
$polSrc = Join-Path $srcRoot 'поляки'
$map = @(
  @{ from = '1'; to = 'polaki\1' },
  @{ from = '2'; to = 'polaki\2' },
  @{ from = 'КП в Московской области'; to = 'polaki\3' }
)
foreach ($pair in $map) {
  $from = Join-Path $polSrc $pair.from
  $to = Join-Path $pub $pair.to
  if (-not (Test-Path -LiteralPath $from)) { Write-Warning "Пропуск: нет $from"; continue }
  New-Item -ItemType Directory -Force -Path $to | Out-Null
  Copy-Item -LiteralPath (Join-Path $from '*') -Destination $to -Force
  Write-Host "polaki: $($pair.to) ($((Get-ChildItem $to -File).Count) файлов)"
}

# Москва → public/projects/moscow/01 … 13
$msk = Join-Path $srcRoot 'Москва'
$mskDst = Join-Path $pub 'moscow'
New-Item -ItemType Directory -Force -Path $mskDst | Out-Null
1..13 | ForEach-Object {
  $from = Join-Path $msk "$_"
  $to = Join-Path $mskDst ($_.ToString('D2'))
  if (-not (Test-Path -LiteralPath $from)) { return }
  $n = (Get-ChildItem -LiteralPath $from -File -ErrorAction SilentlyContinue | Measure-Object).Count
  if ($n -eq 0) { return }
  New-Item -ItemType Directory -Force -Path $to | Out-Null
  Copy-Item -LiteralPath (Join-Path $from '*') -Destination $to -Force
}
Write-Host "moscow: папок $((Get-ChildItem $mskDst -Directory -ErrorAction SilentlyContinue).Count)"
Write-Host "Готово: $pub"
$tilda = Join-Path $appRoot '..\..\marrob-tilda'
if (Test-Path -LiteralPath $tilda) {
  Write-Host "Tilda-export: node build-tilda.js в $tilda"
}
