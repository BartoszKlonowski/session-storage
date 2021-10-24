import * as logic from "./MainPopupLogic";
import * as React from 'react';
import ReactDOM from "react-dom";

export class MainPopup extends React.Component {
    render() {
        return(
            <>
            <div id="popup-content">

            <div class="panel-plugin-name">
              <a href="https://github.com/BartoszKlonowski/keep-your-session">Keep Your Session</a>
            </div>
      
            <form id="mainForm">
              <div class="panel-session-name">
                <input id="sessionNameInput" list="sessions" type="text" placeholder="..." autofocus/>
                <datalist id="sessions"></datalist>
              </div>
              <div class="panel-actions">
                <button type="submit" id="saveButton"><i class="glyphicon glyphicon-floppy-disk"></i></button>
                <button type="submit" id="deleteButton"><i class="glyphicon glyphicon-trash"></i></button>
                <button type="submit" id="reopenButton"><i class="glyphicon glyphicon-refresh"></i></button>
              </div>
            </form>
          </div>
          </>
        )
    }
}

logic.listenForClicks(document, browser);
ReactDOM.render(
    <MainPopup />,
    document.getElementById('root')
);
