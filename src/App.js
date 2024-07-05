import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GraphComponent from "./components/GrapgComponent.js";
import EndPage from "./components/EndPage.js";
import "./App.css";
import SignIn from "./components/Signin/SignIn.jsx";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GraphComponent />} />
          <Route path="/end" element={<EndPage />} />
          <Route path="/auth" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
