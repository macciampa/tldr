# TLDR - Web Page Summarizer

A Chrome extension that provides quick summaries of web pages using OpenAI's GPT-3.5. The extension uses your OpenAI API key to generate concise summaries of any webpage.

## Features

- Quick and easy webpage summarization
- Support for both bullet point and paragraph summaries
- Light and dark theme support
- Secure local storage of your API key
- Works on any webpage

## Setup Instructions

### OpenAI API Key Setup

1. Get your OpenAI API key:
   - Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Click "Create new secret key"
   - Copy your API key (it starts with "sk-")
   - Note: You'll need to add a payment method to your OpenAI account to use the API

### Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" button
4. Select the directory containing this extension's files
5. The extension should now appear in your Chrome toolbar
6. Click the extension icon and go to Settings
7. Paste your OpenAI API key in the settings page

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
- `settings.html`: Settings page for API key and preferences
- `settings.js`: JavaScript for settings page

## Security Notes

- Your OpenAI API key is stored locally in your browser's storage
- The key is never sent to any servers other than OpenAI's API
- All API calls are made directly from your browser to OpenAI

## Note
You'll need to add icon files in the following sizes:
- 16x16 pixels (images/icon16.png)
- 48x48 pixels (images/icon48.png)
- 128x128 pixels (images/icon128.png) 