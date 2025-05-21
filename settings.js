document.addEventListener('DOMContentLoaded', function() {
    const bulletPointsToggle = document.getElementById('bulletPoints');
    const darkThemeToggle = document.getElementById('darkTheme');
    const apiKeyInput = document.getElementById('apiKey');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['useBulletPoints', 'useDarkTheme', 'openaiApiKey'], function(result) {
        bulletPointsToggle.checked = result.useBulletPoints || false;
        darkThemeToggle.checked = result.useDarkTheme || false;
        apiKeyInput.value = result.openaiApiKey || '';
        applyTheme(result.useDarkTheme || false);
    });

    // Save settings when changed
    function saveSettings() {
        const settings = {
            useBulletPoints: bulletPointsToggle.checked,
            useDarkTheme: darkThemeToggle.checked,
            openaiApiKey: apiKeyInput.value
        };

        chrome.storage.sync.set(settings, function() {
            // Show status message
            statusDiv.style.display = 'block';
            setTimeout(function() {
                statusDiv.style.display = 'none';
            }, 2000);
        });
    }

    // Apply theme
    function applyTheme(isDark) {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }

    // Event listeners
    bulletPointsToggle.addEventListener('change', saveSettings);
    darkThemeToggle.addEventListener('change', function() {
        applyTheme(darkThemeToggle.checked);
        saveSettings();
    });
    apiKeyInput.addEventListener('change', saveSettings);
}); 