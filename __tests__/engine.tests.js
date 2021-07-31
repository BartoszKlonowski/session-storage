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
        windowId: 10
    };
    const dbTab = engine.mdnTabToDatabaseTabObject(mdnTab);
    expect(dbTab.hasOwnProperty("active")).toBe(true);
    expect(dbTab.hasOwnProperty("attention")).toBe(false);
    expect(dbTab.hasOwnProperty("audible")).toBe(false);
    expect(dbTab.hasOwnProperty("autoDiscardable")).toBe(false);
    expect(dbTab.hasOwnProperty("cookieStoreId")).toBe(false);
    expect(dbTab.hasOwnProperty("discarded")).toBe(false);
    expect(dbTab.hasOwnProperty("favIconUrl")).toBe(false);
    expect(dbTab.hasOwnProperty("height")).toBe(false);
    expect(dbTab.hasOwnProperty("width")).toBe(false);
    expect(dbTab.hasOwnProperty("hidden")).toBe(true);
    expect(dbTab.hasOwnProperty("highlighted")).toBe(true);
    expect(dbTab.hasOwnProperty("id")).toBe(false);
    expect(dbTab.hasOwnProperty("incognito")).toBe(true);
    expect(dbTab.hasOwnProperty("index")).toBe(true);
    expect(dbTab.hasOwnProperty("isArticle")).toBe(true);
    expect(dbTab.hasOwnProperty("isInReaderMode")).toBe(true);
    expect(dbTab.hasOwnProperty("lastAccessed")).toBe(true);
    expect(dbTab.hasOwnProperty("mutedInfo")).toBe(false);
    expect(dbTab.hasOwnProperty("openerTabId")).toBe(false);
    expect(dbTab.hasOwnProperty("pinned")).toBe(true);
    expect(dbTab.hasOwnProperty("sessionId")).toBe(false);
    expect(dbTab.hasOwnProperty("status")).toBe(false);
    expect(dbTab.hasOwnProperty("successorTabId")).toBe(false);
    expect(dbTab.hasOwnProperty("title")).toBe(false);
    expect(dbTab.hasOwnProperty("url")).toBe(true);
    expect(dbTab.hasOwnProperty("windowId")).toBe(true);    
})
