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
import {
  AUTH_PAGE_ROUTE,
  BLOGS_PAGE_ROUTE,
  BLOG_CREATOR_ROUTE,
  HOME_ROUTE,
  POSTS_PAGE_ROUTE,
  SINGLE_BLOG_ROUTE,
} from "./routes";
import BlogPage from "./pages/BlogPage";
import BlogCreatorPage from "./pages/BlogCreatorPage";

export default function App() {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: "https://socialbook-backend-7vle.onrender.com/graphql",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
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
              <Route path={HOME_ROUTE} element={<Home />} />
              <Route
                path={SINGLE_BLOG_ROUTE}
                element={
                  <ProtectAuthRoute>
                    <BlogPage />
                  </ProtectAuthRoute>
                }
              />
              <Route
                path={POSTS_PAGE_ROUTE}
                element={
                  <ProtectAuthRoute>
                    <PostsPage />
                  </ProtectAuthRoute>
                }
              />
              <Route
                path={BLOGS_PAGE_ROUTE}
                element={
                  <ProtectAuthRoute>
                    <BlogsPage />
                  </ProtectAuthRoute>
                }
              />
              <Route
                path={BLOG_CREATOR_ROUTE}
                element={
                  <ProtectAuthRoute>
                    <BlogCreatorPage />
                  </ProtectAuthRoute>
                }
              />
              <Route path={AUTH_PAGE_ROUTE} element={<AuthPage />} />
            </Routes>
          </Routers>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
