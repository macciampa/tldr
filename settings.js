document.addEventListener('DOMContentLoaded', function() {
    const bulletPointsToggle = document.getElementById('bulletPoints');
    const darkThemeToggle = document.getElementById('darkTheme');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['useBulletPoints', 'useDarkTheme'], function(result) {
        bulletPointsToggle.checked = result.useBulletPoints || false;
        darkThemeToggle.checked = result.useDarkTheme || false;
        applyTheme(result.useDarkTheme || false);
    });

    // Save settings when changed
    function saveSettings() {
        const settings = {
            useBulletPoints: bulletPointsToggle.checked,
            useDarkTheme: darkThemeToggle.checked
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
}); 