import React, {useEffect, useState} from "react";
import Database from "../../engine/Database";

const db = new Database();

const SessionTile = ({name, onSelect}) => {
    const [tabsCount, setTabsCount] = useState(0);

    useEffect(() => {
        db.loadSession(name, (session) => {
            setTabsCount(session?.length);
        });
    }, [name]);

    const nameLenghtTreshold = 22;
    const trimmedName = name.length > nameLenghtTreshold ? name.substring(0, nameLenghtTreshold).concat("...") : name;
    return (
        <div
            className="session-tile-container"
            role={"menuitem"}
            tabIndex={name}
            onClick={onSelect}
            onKeyDown={onSelect}>
            <div className="session-tile-name" title={name}>
                {trimmedName}
            </div>
            <div className="session-tile-tabs-count">{tabsCount}</div>
        </div>
    );
};

export const SessionsList = ({sessions, selectedSession, onSelect}) => {
    if (!sessions?.length) {
        return <div className="sessions-list-container" />;
    }

    const selectedSessions = sessions.filter((session) =>
        session.toLowerCase().includes(selectedSession.toLocaleLowerCase())
    );
    return (
        <div className="sessions-list-container">
            {selectedSessions.map((session) => {
                return (
                    <li key={`sessionSuggestionTile-${session}`}>
                        <SessionTile name={session} onSelect={() => onSelect(session)} />
                    </li>
                );
            })}
        </div>
    );
};
