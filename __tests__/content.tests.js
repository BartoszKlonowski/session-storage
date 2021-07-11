import Content from "../app/src/content_scripts/Content";

test("Content constructor receives data correctly", () => {
    const content = new Content("testing command", "testing session");
    expect(content.getSession()).toBe("testing session");
    expect(content.getCommand()).toBe("testing command");
});
