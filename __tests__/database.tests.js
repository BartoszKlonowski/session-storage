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
