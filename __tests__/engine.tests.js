import Engine from "../app/src/engine/Engine";

test("Engine returns true if session name is correct", () => {
    const engine = new Engine({});
    expect(engine.isSessionNameCorrect("correct name of session")).toBe(true);
});

test("Engine returns false if session name is empty or incorrect", () => {
    const engine = new Engine({});
    expect(engine.isSessionNameCorrect("")).toBe(false);
});

test("MDN tabs.Tab object is converted successfully to Database Tab internal object", () => {
    const engine = new Engine({});
    const mdnTab = {
        active: false,
        attention: false,
        audible: true,
        autoDiscardable: false,
        cookieStoreId: "00ffea3",
        discarded: false,
        favIconUrl: "https://www.google.com",
        height: 100,
        width: 100,
        hidden: false,
        highlighted: true,
        id: 0,
        incognito: true,
        index: 12,
        isArticle: true,
        isInReaderMode: false,
        lastAccessed: 23145,
        mutedInfo: {},
        openerTabId: 10,
        pinned: false,
        sessionId: 10,
        status: "active",
        successorTabId: 9,
        title: "testing tab",
        url: "https://www.google.com",
        windowId: 10,
    };
    const dbTab = engine.mdnTabToDatabaseTabObject(mdnTab);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "active")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "attention")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "audible")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "autoDiscardable")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "cookieStoreId")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "discarded")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "favIconUrl")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "height")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "width")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "hidden")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "highlighted")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "id")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "incognito")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "index")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "isArticle")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "isInReaderMode")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "lastAccessed")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "mutedInfo")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "openerTabId")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "pinned")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "sessionId")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "status")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "successorTabId")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "title")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "url")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "windowId")).toBe(true);
});

test("All tabs should have window ID replaced with current and correct one", () => {
    const engine = new Engine({});
    let tabs = [
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 1,
        },
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 3,
        },
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 15,
        },
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 8,
        },
    ];

    const correctWindowId = 1;
    engine.assignTabsToCurrentWindow(tabs, correctWindowId);
    for (let tab of tabs) {
        expect(tab.windowId).toBe(correctWindowId);
    }
});

test("All tabs should have window ID replaced with default current window ID for incorrect window ID", () => {
    const engine = new Engine({});
    let tabs = [
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 1,
        },
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 3,
        },
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 15,
        },
        {
            active: true,
            index: 6,
            pinned: false,
            url: "about:debugging#/runtime/this-firefox",
            windowId: 8,
        },
    ];

    const WINDOW_ID_CURRENT = -2;
    engine.assignTabsToCurrentWindow(tabs, "incorrect window's ID", WINDOW_ID_CURRENT);
    for (let tab of tabs) {
        expect(tab.windowId).toBe(WINDOW_ID_CURRENT);
    }
});
