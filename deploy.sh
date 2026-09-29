#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
: "${AWS_REGION:=ap-south-1}"
: "${BUCKET_NAME:?Set BUCKET_NAME to your existing S3 website bucket}"
npm run build
# Do not upload source files, dependencies, Git metadata or remove unrelated objects.
aws s3 sync ./dist "s3://$BUCKET_NAME" --region "$AWS_REGION" --cache-control 'public,max-age=3600'
aws s3 cp ./dist/index.html "s3://$BUCKET_NAME/index.html" --region "$AWS_REGION" --cache-control 'no-cache' --content-type 'text/html'
echo 'Uploaded dist/. Use your configured HTTPS/CloudFront domain.'
