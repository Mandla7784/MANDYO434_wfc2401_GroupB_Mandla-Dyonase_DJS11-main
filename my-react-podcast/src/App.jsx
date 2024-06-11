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
import History from "./pages/History";
import PlayLists from "./pages/Playlistist";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/history" element={<History />} />
          <Route path="/playlists" element={<PlayLists />} />
        </Route>
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
