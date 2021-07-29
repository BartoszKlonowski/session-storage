import Engine from "../app/src/engine/Engine";

test("Engine returns true if session name is correct", () => {
    const engine = new Engine({});
    expect(engine.isSessionNameCorrect("correct name of session")).toBe(true);
});

test("Engine returns false if session name is empty or incorrect", () => {
    const engine = new Engine({});
    expect(engine.isSessionNameCorrect("")).toBe(false);
});
