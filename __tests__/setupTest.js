if (!global.browser) global.browser = {tabs: {}};

test("Browser is defined correctly for web extension testing", () => {
    expect(global.browser).toBeDefined();
});
