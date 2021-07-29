import * as plugin from "../app/src/popup/MainPopupLogic";

test("buttonIdToCommandId returns correct", () => {
    expect(plugin.buttonIdToCommandMessage("saveButton")).toBe("save");
    expect(plugin.buttonIdToCommandMessage("deleteButton")).toBe("delete");
    expect(plugin.buttonIdToCommandMessage("reopenButton")).toBe("reopen");
});

test("buttonIdToCommandId returns unknown for incorrect ID", () => {
    expect(plugin.buttonIdToCommandMessage("thisIsNotAnExistingButton")).toBe("unknown");
});

test("sendMessageToEngineListener passes message as is in a correct command", () => {
    function sendMessage(id, command) {
        id, command;
    }
    const tab = {id: 0, sendMessage};
    expect(
        plugin.sendMessageToEngineListener({runtime: {sendMessage}}, [tab, tab], "proper message", "testSession")
    ).toMatchObject({
        command: "proper message",
        session: "testSession",
    });
});
