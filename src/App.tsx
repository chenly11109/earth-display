import "./App.css";
import Earth from "./components/Earth";
import EarthStateIcon from "./components/EarthStateIcon";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";



function App() {

  return (
    <Router>
      <div className="App">      
        <div className="main_container">
         {/* 地球部分*/}
         <Earth />

         <EarthStateIcon />
        </div>
      </div>
    </Router>
  );
}

export default App;
