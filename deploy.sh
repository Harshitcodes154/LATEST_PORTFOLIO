#!/usr/bin/env bash
set -e
: "${AWS_REGION:=ap-south-1}"
: "${BUCKET_NAME:?Set BUCKET_NAME first}"
aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$AWS_REGION" --create-bucket-configuration LocationConstraint="$AWS_REGION" 2>/dev/null || true
aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html
aws s3 sync . "s3://$BUCKET_NAME" --delete --exclude "*.sh" --exclude "*.ps1"
echo "Uploaded. Check the S3 static website endpoint in AWS Console."
