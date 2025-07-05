if (!global.browser) global.browser = {tabs: {}};
if (!browser) var browser = {};
if (!global.browser.i18n) global.browser = {tabs: {}, i18n: {}};
if (!global.browser.i18n.getUILanguage) global.browser = {tabs: {}, i18n: {getUILanguage: () => "en"}};
if (!global.IS_REACT_ACT_ENVIRONMENT) global.IS_REACT_ACT_ENVIRONMENT = true;

test("Browser is defined correctly for web extension testing", () => {
    expect(browser).toBeDefined();
});
