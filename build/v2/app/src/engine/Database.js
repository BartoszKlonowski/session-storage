class Database {
  constructor() {
      this.storage = window.localStorage;
  }

  saveSession(name, tabs) {
      if (this.isSessionCorrect(name, tabs) === true) {
          try {
              this.storage.setItem(name, `${JSON.stringify(tabs)}`);
              let allSessions = this.loadSessions();
              allSessions = this.addNewSessionNameToStorage(name, allSessions);
              this.saveSessions(allSessions);
          } catch (exception) {
              console.log(`ERROR: `, exception);
          }
      }
  }

  deleteSession(name) {
      try {
          this.storage.removeItem(name);
          let allSessions = this.loadSessions();
          allSessions = this.removeSessionNameFromStorage(name, allSessions);
          this.saveSessions(allSessions);
      } catch (exception) {
          console.log("ERROR: Could not remove the item. ", exception);
      }
  }

  loadSession(name) {
      try {
          const sessionData = this.storage.getItem(name);
          return JSON.parse(sessionData);
      } catch (exception) {
          console.log("ERROR: Could not read from database: ", exception);
          return {};
      }
  }

  loadSessions() {
      const sessionsArray = this.storage.getItem("sessions");
      if (sessionsArray) {
          return JSON.parse(sessionsArray);
      } else {
          return [];
      }
  }

  saveSessions(allSessionsArray) {
      this.storage.setItem("sessions", JSON.stringify(allSessionsArray));
  }

  isSessionCorrect(sessionName, sessionData) {
      return typeof sessionName === "string" && sessionData.length > 0;
  }

  addSessionNameToDbTabsObject(dbTabsObject, sessionName) {
      let sessionNameForDbObject = undefined;
      if (this.isSessionCorrect(sessionName, dbTabsObject) === true) {
          sessionNameForDbObject = sessionName;
      } else {
          console.log("ERROR: Incorrect session name given - returning undefined");
      }
      const dbObject = {
          sessionName: sessionNameForDbObject,
          sessionTabs: dbTabsObject,
      };
      return dbObject;
  }

  pushToLoadedDataIfSessionMatch(session, loadedData, item) {
      if (session === item.sessionName) {
          loadedData.push(item);
      }
  }

  addNewSessionNameToStorage(newSessionName, allSessions) {
      if (!allSessions) {
          return [newSessionName];
      }
      if (!this.sessionNameAlreadyExistsInStorage(newSessionName, allSessions)) {
          return [...allSessions, newSessionName];
      } else {
          return allSessions;
      }
  }

  removeSessionNameFromStorage(deletingSessionName, allSessions) {
      var index = allSessions.indexOf(deletingSessionName);
      if (index > -1) {
          allSessions.splice(index, 1);
      }
      return allSessions;
  }

  sessionNameAlreadyExistsInStorage(sessionName, allSessions) {
      if (allSessions && allSessions.length > 0) {
          return (
              allSessions?.find((session) => {
                  return session === sessionName;
              }) === sessionName
          );
      } else {
          return false;
      }
  }
}

export default Database;
