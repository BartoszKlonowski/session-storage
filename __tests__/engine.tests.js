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
    expect(Object.prototype.hasOwnProperty.call(dbTab, "hidden")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "highlighted")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "id")).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "incognito")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "index")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "isArticle")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "isInReaderMode")).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(dbTab, "lastAccessed")).toBe(true);
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
