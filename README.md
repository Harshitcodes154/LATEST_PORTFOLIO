# Harshit Kumar — Amazon S3 Static Portfolio

A responsive, static personal portfolio for Amazon S3 Static Website Hosting.

## Included
- Responsive HTML/CSS/JavaScript portfolio
- Gmail, LinkedIn and GitHub buttons
- Downloadable resume (`assets/Harshit_Kumar_Resume.pdf`)
- Project filtering
- Projects and technologies based on Harshit Kumar's supplied resume and public GitHub profile
- AWS S3 deployment scripts
- No build step required

## S3 deployment

### AWS Console
1. Create an S3 bucket with a globally unique name.
2. Upload the contents of this folder (not the ZIP itself).
3. Enable Static website hosting.
4. Set the index document to `index.html`.
5. Configure the bucket policy/public access according to your AWS account's static website requirements.
6. Open the S3 website endpoint.

### AWS CLI
Run `deploy.sh` on macOS/Linux or `deploy.ps1` in PowerShell after setting:
`AWS_REGION=ap-south-1`
`BUCKET_NAME=your-unique-bucket-name`

The site is static and does not require Node.js or a build command.
