// Function to extract main content from the page
function extractPageContent() {
    // Get the main content (prioritize article or main content)
    const article = document.querySelector('article');
    const main = document.querySelector('main');
    const body = document.body;

    // Use article if available, otherwise main, fallback to body
    const content = article || main || body;

    // Get text content and clean it up
    let text = content.innerText
        .replace(/\s+/g, ' ')
        .trim();

    // Limit text length to avoid token limits
    const maxLength = 4000;
    if (text.length > maxLength) {
        text = text.substring(0, maxLength) + '...';
    }

    return {
        title: document.title,
        url: window.location.href,
        content: text
    };
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageContent') {
        sendResponse(extractPageContent());
    }
}); 