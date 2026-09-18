$ErrorActionPreference = "Stop"
if (-not $env:BUCKET_NAME) { throw "Set `$env:BUCKET_NAME first" }
if (-not $env:AWS_REGION) { $env:AWS_REGION = "ap-south-1" }
aws s3api create-bucket --bucket $env:BUCKET_NAME --region $env:AWS_REGION --create-bucket-configuration LocationConstraint=$env:AWS_REGION
aws s3 website "s3://$env:BUCKET_NAME" --index-document index.html --error-document index.html
aws s3 sync . "s3://$env:BUCKET_NAME" --delete --exclude "*.sh" --exclude "*.ps1"
Write-Host "Uploaded. Check the S3 static website endpoint in AWS Console."
