if (!global.browser) global.browser = {tabs: {}};
if (!browser) var browser = {};

test("Browser is defined correctly for web extension testing", () => {
    expect(browser).toBeDefined();
});
