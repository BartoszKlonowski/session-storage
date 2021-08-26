import Database from "../app/src/engine/Database";

test("Database number gets converted correctly to schema index", () => {
    const testDb = new Database(window);
    expect(testDb.dbNumberToSchemaIndex(2)).toBe(1);
    expect(testDb.dbNumberToSchemaIndex(0)).toBe(0);
    expect(testDb.dbNumberToSchemaIndex(1)).toBe(0);
});

test("Database uses the correct schema", () => {
    const testDb = new Database(window);
    expect(testDb).toBeDefined();
    const currentSchema = testDb.getSchema(0);

    expect(currentSchema).toBeDefined();
    expect(currentSchema.autoIncrement).toBe(true);
    expect(currentSchema.keyPath).toBe("id");
    expect(currentSchema.sessionName).toBe("sessionName");
    expect(currentSchema.sessionObject).toBe("sessionObject");
    expect(currentSchema.sessionObjectUnique).toBe(false);
    expect(currentSchema.id).toBe(1);
});

test("Session entry recognized as correct when OK", () => {
    const testDb = new Database(window);
    expect(testDb).toBeDefined();

    expect(testDb.isSessionCorrect("OKSession", {id: 0})).toBe(true);
});

test("Session entry recognized as incorrect when NOT OK", () => {
    const testDb = new Database(window);
    expect(testDb).toBeDefined();

    expect(testDb.isSessionCorrect("NOKSession", true)).toBe(false);
    expect(testDb.isSessionCorrect(10, {key: 0})).toBe(false);
    expect(testDb.isSessionCorrect({id: 10}, "true")).toBe(false);
});
