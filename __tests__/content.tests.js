import Content from "../app/src/content_scripts/Content";

test("Content constructor receives data correctly", () => {
    const content = new Content("testing command", "testing session");
    expect(content.getSession()).toBe("testing session");
    expect(content.getCommand()).toBe("testing command");
});

test("Content constructor receives data and browser object correctly", () => {
    const content = new Content("testing command", "testing session", {data: "any", object: "object"});
    expect(content.getSession()).toBe("testing session");
    expect(content.getCommand()).toBe("testing command");
    expect(content.browser).toStrictEqual({data: "any", object: "object"});
});
