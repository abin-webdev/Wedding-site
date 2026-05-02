import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar  from "./components/Navbar";
import Home    from "./pages/Home";
import Story   from "./pages/Story";
import Gallery from "./pages/Gallery";
import Map     from "./pages/Map";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/story"   element={<Story />}   />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/venue"   element={<Map />}     />
      </Routes>
    </BrowserRouter>
  );
}

export default App;