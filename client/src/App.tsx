import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ThemeProvider from "./context/ThemeProvider";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <ThemeProvider>
      <Routers>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/blogs" element={<Home />} />
          <Route path="/chats" element={<Home />} />
          <Route path="/auth/:action" element={<AuthPage />} />
        </Routes>
      </Routers>
    </ThemeProvider>
  );
}
