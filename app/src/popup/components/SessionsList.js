import React, {useEffect, useState} from "react";
import Database from "../../engine/Database";

const db = new Database();

const SessionTile = ({name}) => {
    const [tabsCount, setTabsCount] = useState(0);

    useEffect(() => {
        db.loadSession(name, (session) => {
            setTabsCount(session?.length);
        });
    }, [name]);

    return (
        <div className="session-tile-container">
            <div className="session-tile-name">{name}</div>
            <div className="session-tile-tabs-count">{tabsCount}</div>
        </div>
    );
};

export const SessionsList = ({sessions, selectedSession}) => {
    if (!sessions?.length) {
        return null;
    }

    const selectedSessions = sessions.filter((session) => session.includes(selectedSession));
    return (
        <div className="sessions-list-container">
            {selectedSessions.map((session) => {
                return (
                    <li key={`sessionSuggestionTile-${session}`}>
                        <SessionTile name={session} />
                    </li>
                );
            })}
        </div>
    );
};
