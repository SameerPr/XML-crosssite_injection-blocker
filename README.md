# XSS Crosssite injection blocker

A Google chrome Extension to detect XSS cross site scripting injection based on regex patterns and block the requests.  
This extension captures both GET & POST requests, checks for the possible combinations of threat vectors in the form of various HTML tags and blocks the page if data contains any threat vector.

##Usage:
* Type `chrome://extensions` in a tab to bring up the extensions page.
* check `Developer mode` to enable loading unpacked extensions. This will allow you to load your extension from a folder.
* Finally, click `Load unpacked extension` or simply drag the Extension folder onto the page to load up the extension.
* Test this extension on any webpage by sending GET and POST request with XSS payloads.

This is not 100% sure to block all possible threat vectors but it can work on most of the cases.  
More threat vectors can be found on [Owasp site](https://owasp.org/www-community/xss-filter-evasion-cheatsheet).
