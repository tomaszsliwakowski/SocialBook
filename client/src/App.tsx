import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/blogs" element={<Home />} />
        <Route path="/chats" element={<Home />} />
      </Routes>
    </Routers>
  );
}
