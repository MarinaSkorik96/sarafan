import React from "react";
import "./App.css";
import Main from "./pages/main/Main/Main";
import { Routes, Route } from "react-router-dom";
import FullPost from "./pages/main/post/FullPost";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/post" element={<FullPost />}/>

      {/* <div className="App">
        
      </div> */}
    </Routes>
  );
};

export default App;
