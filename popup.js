// This script will run when the popup is opened
console.log('Hello from the Chrome extension!');

document.addEventListener('DOMContentLoaded', function() {
    const summarizeBtn = document.getElementById('summarizeBtn');
    const summaryBox = document.getElementById('summaryBox');
    const loadingDiv = document.querySelector('.loading');
    const errorDiv = document.querySelector('.error');
    const successDiv = document.querySelector('.success');
    const settingsLink = document.getElementById('settingsLink');

    // Check for API key when popup opens
    chrome.storage.sync.get(['openaiApiKey'], function(result) {
        if (!result.openaiApiKey) {
            showError('Please set your OpenAI API key in settings to use this extension');
            summarizeBtn.disabled = true;
        }
    });

    // Open settings page when settings link is clicked
    settingsLink.addEventListener('click', function(e) {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
    });

    // Load theme preference
    chrome.storage.sync.get(['useDarkTheme'], function(result) {
        if (result.useDarkTheme) {
            document.body.setAttribute('data-theme', 'dark');
        }
    });

    function setLoading(isLoading) {
        summarizeBtn.disabled = isLoading;
        loadingDiv.style.display = isLoading ? 'block' : 'none';
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        successDiv.style.display = 'none';
    }

    function showSuccess() {
        successDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 2000);
    }

    summarizeBtn.addEventListener('click', async function() {
        setLoading(true);
        summaryBox.textContent = '';

        try {
            // Get user preferences and API key
            const preferences = await chrome.storage.sync.get(['useBulletPoints', 'openaiApiKey']);
            const useBulletPoints = preferences.useBulletPoints || false;
            const apiKey = preferences.openaiApiKey;
            
            if (!apiKey) {
                throw new Error('Please enter your OpenAI API key in the settings page');
            }

            // Get the active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Get page content from content script
            const pageContent = await chrome.tabs.sendMessage(tab.id, { action: 'getPageContent' });

            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: useBulletPoints 
                                ? 'You are a helpful assistant that summarizes web pages. Provide a concise summary of the main points in bullet point format.'
                                : 'You are a helpful assistant that summarizes web pages. Provide a concise summary of the main points.'
                        },
                        {
                            role: 'user',
                            content: `Please summarize this page titled "${pageContent.title}":\n\n${pageContent.content}`
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            const summary = data.choices[0].message.content;

            // Format the summary if bullet points are enabled
            if (useBulletPoints) {
                // Split by bullet points and join with line breaks
                const formattedSummary = summary
                    .split(/[•\-\*]/)  // Split by common bullet point characters
                    .map(point => point.trim())
                    .filter(point => point.length > 0)  // Remove empty points
                    .map(point => `- ${point}`)  // Use hyphen instead of bullet point
                    .join('\n\n');  // Add double line breaks between points
                
                summaryBox.textContent = formattedSummary;
            } else {
                summaryBox.textContent = summary;
            }
            showSuccess();
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'Error generating summary. Please try again later.');
        } finally {
            setLoading(false);
        }
    });
}); 