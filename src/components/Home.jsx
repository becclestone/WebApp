import React from "react";
import { Link, withRouter } from "react-router-dom";

function Home() {
  const value = 'World';
  return (
    <div className="home">
       <div>Hello {value} - This is open page try <Link to="/about"Viewer</Link>;
    </div>
  );
}

export default Home;
