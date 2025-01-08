# club-wpt-chrome-extension

This Chrome extension scrapes tournament information from the ClubWPT lobby website and adds them to your Google Calendar.

## Installation

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode".
4. Click "Load unpacked" and select the directory containing this project.

## Usage

1. Navigate to the ClubWPT lobby website.
2. Click on the extension icon to open the popup.
3. Click the "Scrape Tournaments" button.
4. The tournament information will be scraped and added to your Google Calendar.

## Permissions

- `identity`: Required for OAuth2 authentication with Google Calendar.
- `activeTab`: Required to execute the content script on the active tab.
- `scripting`: Required to inject the content script.

## Development

- **`manifest.json`**: Configures the extension.
- **`content/`**: Contains the content script for scraping data.
- **`background/`**: Contains the background script for API interactions.
- **`popup/`**: Contains the popup UI files.
- **`icons/`**: Contains the extension icons.
