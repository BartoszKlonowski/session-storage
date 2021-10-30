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

    expect(testDb.isSessionCorrect("OKSession", [{id: 0}, {id: 1}])).toBe(true);
});

test("Session entry recognized as incorrect when NOT OK", () => {
    const testDb = new Database(window);
    expect(testDb).toBeDefined();

    expect(testDb.isSessionCorrect("NOKSession", true)).toBe(false);
    expect(testDb.isSessionCorrect(10, {key: 0})).toBe(false);
    expect(testDb.isSessionCorrect({id: 10}, "true")).toBe(false);
});

test("Session is loaded correctly", () => {
    const testDb = new Database(window);
    expect(testDb).toBeDefined();
    const dbData = [
        {sessionName: "testingSession", sessionData: "test1"},
        {sessionName: "incorrectTestingSession", sessionData: "test2"},
        {sessionName: "testingSession", sessionData: "test3"},
        {sessionName: "testingSession", sessionData: "test4"},
        {sessionName: "anotherTestingSession", sessionData: "test5"},
    ];
    let loadedData = [];

    for (const loadedItem of dbData) {
        testDb.pushToLoadedDataIfSessionMatch("testingSession", loadedData, loadedItem);
    }

    expect(loadedData.length).toBe(3);
    expect(loadedData[0].sessionData).toBe("test1");
    expect(loadedData[1].sessionData).toBe("test3");
    expect(loadedData[2].sessionData).toBe("test4");
});

test("Local storage gets created successfully", () => {
    const testDb = new Database(window);
    expect(testDb.storage).toBeInstanceOf(Storage);
});

test("Session object is extended successfully when session name is correct", () => {
    const testDb = new Database(window);
    const testDbTabsObject = [
        {isActive: true, isTest: true, isFinite: false},
        {isActive: true, isTest: true, isFinite: false},
    ];
    const sessionName = "testing session - correct name";
    const result = testDb.addSessionNameToDbTabsObject(testDbTabsObject, sessionName);
    expect(result).toMatchObject({
        sessionName: "testing session - correct name",
        sessionTabs: [
            {isActive: true, isTest: true, isFinite: false},
            {isActive: true, isTest: true, isFinite: false},
        ],
    });
});

test("Stored sessions are extended correctly with new session", () => {
    const testDb = new Database();
    let allSessions = ["firstSession", "tested existing session"];
    const originalStorageLength = allSessions.length;
    allSessions = testDb.addNewSessionNameToStorage("newSession", allSessions);
    expect(allSessions.length).toBe(originalStorageLength + 1);
    expect(allSessions[originalStorageLength]).toBe("newSession");
});

test("Stored sessions are not extended when session already exists", () => {
    const testDb = new Database();
    let allSessions = ["firstSession", "tested existing session", "already existing session"];
    const originalStorageLength = allSessions.length;
    allSessions = testDb.addNewSessionNameToStorage("already existing session", allSessions);
    expect(allSessions.length).toBe(originalStorageLength);
    expect(allSessions[0]).toBe("firstSession");
});

test("Adding new session to empty storage creates the storage array", () => {
    const testDb = new Database();
    let allSessions = undefined;
    allSessions = testDb.addNewSessionNameToStorage("the only existing session", allSessions);
    expect(allSessions.length).toBe(1);
    expect(allSessions[0]).toBe("the only existing session");
});

test("Session name doesn't exist if session array is empty", () => {
    const testDb = new Database();
    let allSessions = [];
    const exists = testDb.sessionNameAlreadyExistsInStorage("already existing session", allSessions);
    expect(exists).toBe(false);
});

test("Session name doesn't exist if session array is falsy", () => {
    const testDb = new Database();
    let allSessions = undefined;
    const exists = testDb.sessionNameAlreadyExistsInStorage("already existing session", allSessions);
    expect(exists).toBe(false);
});

test("Stored session is correctly removed from storage array", () => {
    const testDb = new Database();
    let allSessions = ["firstSession", "tested existing session", "session to delete", "already existing session"];
    const originalStorageLength = allSessions.length;
    allSessions = testDb.removeSessionNameFromStorage("session to delete", allSessions);
    expect(allSessions.length).toBe(originalStorageLength - 1);
    expect(allSessions[2]).toBe("already existing session");
});
