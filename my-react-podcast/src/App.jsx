import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/input.css";
import "./App.css";
import Header from "./components/Header";
import "tailwindcss/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";

//imporing from  Pages

import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import About from "./pages/About";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
