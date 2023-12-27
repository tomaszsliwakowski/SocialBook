import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ThemeProvider from "./context/ThemeProvider";
import AuthPage from "./pages/AuthPage";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { AuthProvider } from "./context/Auth";
import ProtectAuthRoute from "./context/ProtectAuthRoute";
import PostsPage from "./pages/PostsPage";
import BlogsPage from "./pages/BlogsPage";

export default function App() {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <Routers>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/posts"
                element={
                  <ProtectAuthRoute>
                    <PostsPage />
                  </ProtectAuthRoute>
                }
              />
              <Route
                path="/blogs"
                element={
                  <ProtectAuthRoute>
                    <BlogsPage />
                  </ProtectAuthRoute>
                }
              />
              <Route
                path="/chats"
                element={
                  <ProtectAuthRoute>
                    <Home />
                  </ProtectAuthRoute>
                }
              />
              <Route path="/auth/:action" element={<AuthPage />} />
            </Routes>
          </Routers>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
