import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GraphComponent from "./components/GrapgComponent.js";
import EndPage from "./components/EndPage.js";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GraphComponent />} />
          <Route path="/end" element={<EndPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
