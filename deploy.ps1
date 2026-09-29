$ErrorActionPreference = 'Stop'
if (-not $env:BUCKET_NAME) { throw 'Set $env:BUCKET_NAME to your existing S3 website bucket.' }
if (-not $env:AWS_REGION) { $env:AWS_REGION = 'ap-south-1' }
Push-Location $PSScriptRoot
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Build failed; nothing uploaded.' }
    # Upload only the built site. Do not remove unrelated objects or alter bucket permissions.
    aws s3 sync ./dist "s3://$env:BUCKET_NAME" --region $env:AWS_REGION --cache-control 'public,max-age=3600'
    if ($LASTEXITCODE -ne 0) { throw 'S3 upload failed.' }
    aws s3 cp ./dist/index.html "s3://$env:BUCKET_NAME/index.html" --region $env:AWS_REGION --cache-control 'no-cache' --content-type 'text/html'
    if ($LASTEXITCODE -ne 0) { throw 'HTML upload failed.' }
    Write-Host 'Uploaded dist/. Use your configured HTTPS/CloudFront domain.'
} finally { Pop-Location }
