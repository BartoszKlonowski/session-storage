import * as plugin from '../app/src/popup/MainPopupLogic';

test('buttonIdToCommandId returns correct', () => {
    expect(plugin.buttonIdToCommandMessage("saveButton")).toBe("save");
    expect(plugin.buttonIdToCommandMessage("deleteButton")).toBe("delete");
    expect(plugin.buttonIdToCommandMessage("reopenButton")).toBe("reopen");
});

test('buttonIdToCommandId returns unknown for incorrect ID', () => {
    expect(plugin.buttonIdToCommandMessage("thisIsNotAnExistingButton")).toBe("unknown");
});

test('sendMessageToEngineListener passes message as is in a correct command', () => {
    const tab = {"id": 0, sendMessage(id, command){}};
    expect(plugin.sendMessageToEngineListener({tabs: {sendMessage(id, command){}}}, [tab,tab], "proper message")).toMatchObject({command: "proper message"});
});
