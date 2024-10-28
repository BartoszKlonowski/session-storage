import React from "react";
import TestRenderer, {act} from "react-test-renderer";
import {SessionsList} from "../app/src/popup/components/SessionsList";
import {Popup} from "../app/src/popup/components/Popup";
import ActionButton from "../app/src/popup/components/ActionButton";

async function renderElementAsObject(element) {
    let component;
    await act(async () => {
        component = TestRenderer.create(element);
    });
    return JSON.parse(JSON.stringify(component.toJSON()));
}

function getChild(renderedObject, childIndex) {
    const child = renderedObject.children[childIndex];
    return child;
}

test("SessionsList is case insensitive by default", async () => {
    const testSessions = ["session without upperCase", "Session with UpperCase"];
    const sessionList = await renderElementAsObject(
        <SessionsList
            sessions={testSessions}
            selectedSession={"session with UpperCase"}
            onSelect={(session) => {
                session;
            }}
        />
    );

    expect(sessionList).toBeDefined();
    const renderedSessionTile = getChild(getChild(sessionList, 0), 0);
    expect(renderedSessionTile).toBeDefined();
    expect(renderedSessionTile.props.tabIndex).toBe(testSessions[1]);
});

test("SessionList can be switched to case sensitive", async () => {
    const testSessions = ["session and upperCase", "Session and UpperCase"];
    const sessionList = await renderElementAsObject(
        <SessionsList
            sessions={testSessions}
            caseSensitive={true}
            selectedSession={"Session and UpperCase"}
            onSelect={(session) => {
                session;
            }}
        />
    );

    expect(sessionList).toBeDefined();
    const renderedSessionTile = getChild(getChild(sessionList, 0), 0);
    expect(renderedSessionTile).toBeDefined();
    expect(renderedSessionTile.props.tabIndex).toBe(testSessions[1]);
});

test("MainPopup component has the 'Save' button by default", async () => {
    const mainPopup = await renderElementAsObject(
        <Popup />
    );

    expect(mainPopup).toBeDefined();
    const saveButton = getChild(getChild(mainPopup, 1), 0);
    const saveButtonTitle = getChild(saveButton.children[1], 0);
    expect(saveButton.props.id).toBe("saveButton");
    expect(saveButtonTitle).toBe("Save");
});

test("ActionButton has a correct tooltip shown", async () => {
    const button = await renderElementAsObject(
        <ActionButton name="deleteButton" text="DELETE" icon="delete" />
    );
    expect(button).toBeDefined();
    expect(button.props.title).toBe("Delete");
});

test("ActionButton has a correct ID assigned based on props", async () => {
    const button = await renderElementAsObject(
        <ActionButton name="saveButton" text="SAVE" icon="save" />
    );
    expect(button).toBeDefined();
    expect(button.props.id).toBe("saveButton");
});
