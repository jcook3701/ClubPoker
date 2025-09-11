# club-wpt-chrome-extension

This Chrome extension scrapes tournament information from the ClubWPT lobby website and adds them to your Google Calendar.

## Pre-commit commands

1. Auto fix linting errors and improve code quality.  
``` shell
$ npm run lint-fix
```
2. Auto fix code formatting to improve readability and my sanity.  
``` shell
$ npm run pretty
```

## Installation

1. Open Google Chrome and navigate to `chrome://extensions/`.  
2. Enable "Developer mode".  
3. Clone or download this repository.  
4. Build package from source code.  This allows for code to run within google chrome.  
``` shell
$ npm run build
```
5. Click "Load unpacked" and select the directory containing this project.  

## Storybook
6. Build package components for use in storybook.  
``` shell
$ npm run build-storybook  
```

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

## Helpful Links:
[Icons](https://mui.com/material-ui/material-icons/?query=ques)  
[Poker Icons](https://www.freepik.com/icons/poker)  
