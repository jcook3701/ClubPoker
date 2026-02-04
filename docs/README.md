# ClubPoker Chrome Extension

[![License](https://img.shields.io/github/license/{{ site.github_username }}{{ site.baseurl }})](LICENSE.md)

## Overview
This is a Chrome extension intended to interface with clubwpt.com.  It offers the ability to modify timezone for tournaments viewed on [lobby.clubwpt.com](https://lobby.clubwpt.com/) site. And save specified tournaments to a users Google Calendar for easy reminders.  

Unofficial helper tool for  ClubWPT's website. Not affiliated with WPT in any way. This Chrome extension scrapes tournament information from the ClubWPT lobby website modifies live tournament times for user specified timezone and allows the ability to add tournaments to a specified Google Calendar. No longer will you miss the large daily tournaments.  

***

**CI/CD Check List:**

* ![lint-check](https://github.com/jcook3701/ClubPoker/actions/workflows/lint.yml/badge.svg)

***

## Chrome Store Installation
Navigate to the Chrome Web Store and [download](https://chromewebstore.google.com/detail/clubpoker/bnnhlonpnkdahlgdihflafccalglcgej) for quick installation into Google Chrome.  

## Source Code Installation

1. Open Google Chrome and navigate to `chrome://extensions/`.  
2. Enable "Developer mode".  
3. Clone or download this repository.  
4. Build package from source code.  This allows for code to run within google chrome.  
``` shell
$ npm run build  
```
5. Click "Load unpacked" and select the directory containing this project.  

## Usage

1. Navigate to the [ClubWPT](https://lobby.clubwpt.com/) lobby website.  
2. Click on the extension icon to open the popup.  
3. Click the "Scrape Tournaments" button.  
4. The tournament information will be scraped and added to your Google Calendar.  

## Development
### Pre-commit commands

1. Auto fix linting errors and improve code quality.  
``` shell
$ npm run lint-fix  
```
2. Auto fix code formatting to improve readability and my sanity.  
``` shell
$ npm run pretty  
```

### Documentation
Documentation is able to be update automatically via typedoc and scripts/inject-front-matter.js.
1. Run the following command to update documentation.  
``` shell
$ npm run docs  
```
2. Next Move to the ```./docs``` directory
2. First, run the clean command.  
``` shell
$ bundle exec jekyll clean  
```
3. Second, run the build command.  
``` shell
$ bundle exec jekyll build  
```
4. Finally, run the serve command and preview docs locally on ```http://127.0.0.1:4000/```  
``` shell
$ bundle exec jekyll serve  
```

__Note:__ Update documentation after updating ```excludes``` within on of the following index.   files:  
  * [api, services, types]  
  * or create a new index.ts file and update the following files:  
    1. typedoc.json -> Entry points for typedoc
	2. tsconfig.json -> Allows includes with '@' for example '@types'  
	3. webpack.config.js -> Allows includes with '@' to work in ClubPoker Extension.  
  
[Documentation](https://jcook3701.github.io/ClubPoker/) is built from index.ts files at head of the following folders: [api, services, types]  

### Storybook
1. Build package components for use in storybook.  
``` shell
$ npm run build-storybook  
```
2. Host storybook webpage  
``` shell
$ npm run storybook  
```

### Permissions
- `identity`: Required for OAuth2 authentication with Google Calendar.
- `activeTab`: Required to execute the content script on the active tab.
- `scripting`: Required to inject the content script.

## Design
- **`manifest.json`**: Configures the extension.
- **`content/`**: Contains the content script for scraping data.
- **`background/`**: Contains the background script for API interactions.
- **`popup/`**: Contains the popup UI files.
- **`icons/`**: Contains the extension icons.

### Helpful Links:
[Icons](https://mui.com/material-ui/material-icons/?query=ques)  
[Poker Icons](https://www.freepik.com/icons/poker)  

## License

{{ site.copyright }}  

This project is licensed under the **{{ site.license }} License**.  
See the [LICENSE]({{ site.repo_blob }}/LICENSE.md) file for the full license text.  

SPDX-License-Identifier: {{ site.license }}
