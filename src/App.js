import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Viewer, Doctor} from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/viewer" exact component={() => <Viewer />} />
          <Route path="/doctor" exact component={() => <Doctor />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
