import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/input.css";
import "./App.css";
import Header from "./components/Header";

//imporing from  Pages

import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
