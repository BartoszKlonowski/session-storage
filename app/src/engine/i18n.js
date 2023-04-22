if (!browser) {
    try {
        var browser = require("webextension-polyfill");
    } catch (error) {
        // eslint-disable-next-line no-redeclare
        var browser = global.browser;
    }
}

export const SupportedLanguages = ["en", "de", "fr", "pl"];

export function getSupportedBrowserLanguage() {
    const browserLanguage = browser.i18n.getUILanguage().toLowerCase();
    for (const supported of SupportedLanguages) {
        if (supported.toLowerCase() === browserLanguage) {
            return browserLanguage;
        }
    }
    return SupportedLanguages[0];
}

export function getLanguageSource(language = "en") {
    return require(`./translations/${language}.json`);
}

export function translate(label) {
    return getLanguageSource(getSupportedBrowserLanguage())[label];
}
