/* 
Follwed the following tutorial for setting up a multi-page React app: https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/
Altered the code to fit our desired setup
*/
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, OperatorViewer, ClinicianViewer, RedirectPage } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Login />} />
          <Route path="/operatorviewer" exact component={() => <OperatorViewer />} />
          <Route path="/clinicianviewer" exact component={() => <ClinicianViewer />} />
          <Route path="/redirectpage" exact component={() => <RedirectPage />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
