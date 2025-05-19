# TLDR - Web Page Summarizer

A Chrome extension that provides quick summaries of web pages using OpenAI's GPT-3.5, with the API key securely stored in AWS Secrets Manager.

## Setup Instructions

### AWS Configuration

1. Create a secret in AWS Secrets Manager:
   ```bash
   aws secretsmanager create-secret --name openai-api-key --secret-string '{"OPENAI_API_KEY":"your-openai-api-key"}'
   ```

2. Deploy the Lambda function:
   - Create a new Lambda function
   - Copy the code from `backend/lambda_function.py`
   - Set the environment variables:
     - `SECRET_NAME`: The name of your secret (e.g., "openai-api-key")
     - `AWS_REGION`: Your AWS region
   - Configure the Lambda function's IAM role with the following permissions:
     ```json
     {
         "Version": "2012-10-17",
         "Statement": [
             {
                 "Effect": "Allow",
                 "Action": [
                     "secretsmanager:GetSecretValue"
                 ],
                 "Resource": "arn:aws:secretsmanager:*:*:secret:openai-api-key-*"
             }
         ]
     }
     ```
   - Enable CORS for your Lambda function URL
   - Copy the Lambda function URL and update `LAMBDA_URL` in `popup.js`

### Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" button
4. Select the directory containing this extension's files
5. The extension should now appear in your Chrome toolbar

## Usage

1. Navigate to any webpage you want to summarize
2. Click the extension icon
3. Click "Summarize This Page"
4. Wait for the summary to be generated

## Files
- `manifest.json`: Extension configuration
- `popup.html`: The popup UI
- `popup.js`: JavaScript for the popup
- `content.js`: Content script for extracting page content
- `backend/`: Contains AWS Lambda function code
  - `lambda_function.py`: Lambda function to fetch API key
  - `requirements.txt`: Python dependencies for Lambda

## Security Notes

- The OpenAI API key is stored securely in AWS Secrets Manager
- The Lambda function uses IAM roles for access control
- CORS is configured on the Lambda function to restrict access
- All API calls are made server-side through AWS Lambda

## Note
You'll need to add icon files in the following sizes:
- 16x16 pixels (images/icon16.png)
- 48x48 pixels (images/icon48.png)
- 128x128 pixels (images/icon128.png) 