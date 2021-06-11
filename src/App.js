import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, Viewer} from "./components";
function App() {
  return (
    <div className="App">
      <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/viewer" exact component={() => <Viewer />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
