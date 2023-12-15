import "./App.css";
import React from "react";
import Home from "./components/pages/Home";
import Privacypolicy from "./components/pages/Privacypolicy";
import Generatereport from "./components/pages/Generatereport";
import Generatereport2 from "./components/pages/Generatereport2";




import Termsconditions from "./components/pages/Termscondition";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./components/style.css";
import NavBar from "./components/NavBar";


function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/Privacypolicy" element={<Privacypolicy />}></Route>
          <Route path="/Termsconditions" element={<Termsconditions />}></Route>
          <Route path="/generatereport-step-one" element={<Generatereport />}></Route>
          <Route path="/generatereport-step-two" element={<Generatereport2 />}></Route>
        
          <Route path="/" element={<Home />}></Route>
       
 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
