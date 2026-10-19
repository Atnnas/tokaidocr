Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public\colombia_logo.png"
$img = [System.Drawing.Image]::FromFile($imgPath)

$crop = New-Object System.Drawing.Bitmap 42, 42
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.Clear([System.Drawing.Color]::Transparent)
$srcRect = New-Object System.Drawing.Rectangle 0, 0, 42, 42
$destRect = New-Object System.Drawing.Rectangle 0, 0, 42, 42
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$outPath = Join-Path (Get-Location) "public\tokaido_symbol.png"
$crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "Successfully saved $outPath (42x42)"

$img.Dispose()
$crop.Dispose()
$g.Dispose()
