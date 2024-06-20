import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/input.css";
import "./App.css";
import Header from "./components/Header";

import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Importing from Pages
import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import About from "./pages/About";
import Footer from "./components/Footer";
import History from "./pages/History";
import PlayLists from "./pages/Playlistist";
import Sidebar from "./components/Sidebar";
import ShowDetail from "./components/ShowDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/playlists" element={<PlayLists />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/about" element={<About />} />
        <Route path="/show/:showId" element={<ShowDetail />} />{" "}
        {/* Added ShowDetail route */}
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
