console.log("loading content.js")
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { TMessage } from "../../types/TMessage";
import { TTheme } from "../../types/TTheme";

// Send a message to initialize the theme when the content script is first loaded
chrome.runtime.sendMessage<TMessage, TMessage>(
    {
        action: "INIT_THEME",
    },
    ({ theme }) => {
        theme && applyTheme(theme);
    }
);

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
    (request: TMessage, sender, sendResponse) => {
        console.log("content.js: ",request, sender, sendResponse);
        const { action, theme } = request;
        switch (action) {
            case "APPLY_THEME": {
                console.log("content.ts apply theme")
                // Apply the theme when a message is received
                applyTheme(theme);
                sendResponse(request);
                break;
            }
            default: {
                console.log("content.ts default theme")

                // Default response for unknown actions
                sendResponse(request);
                break;
            }
        }
        return true; // Indicates that the response will be sent asynchronously
    }
);

// Function to apply the theme to the current page
const applyTheme = (theme: TTheme) => {
    console.log("working on it");
    const { dark, filter } = theme;

    // Delete previous style if it exists
    let darkModeStyle = document.getElementById("theme-switcher-style");
    darkModeStyle && darkModeStyle.remove();

    // Apply the dark mode style if dark mode is enabled
    if (dark) {
    console.log("apply theme dark mode");

        darkModeStyle = document.createElement("style");
        darkModeStyle.id = "theme-switcher-style";
        darkModeStyle.innerHTML = `
            html {
                filter: ${filter.value} hue-rotate(180deg);
                background: #121212 !important;
            }
            body {
                background: #121212 !important;
                color: #e0e0e0 !important;
            }
            img, video, iframe, object, embed {
                filter: ${filter.value} hue-rotate(180deg) !important;
            }
            input, textarea {
                color: rgba(0,0,0,0.8) !important;
            }
            div:not(div[class*="ytp"]) {
                background-color: #ededed !important;
            }
            p, span {
                color: rgba(0,0,0,0.8) !important;
            }
            a {
                color: #123456 !important;
            }
        `;
        document.head.appendChild(darkModeStyle);
        console.log("handleApplyTheme");
    }
};
