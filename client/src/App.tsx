import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ThemeProvider from "./context/ThemeProvider";
import AuthPage from "./pages/AuthPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Routers>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/blogs" element={<Home />} />
            <Route path="/chats" element={<Home />} />
            <Route path="/auth/:action" element={<AuthPage />} />
          </Routes>
        </Routers>
      </ApolloProvider>
    </ThemeProvider>
  );
}
