import { Provider } from "react-redux";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Main from "../components/SingleBlogs/Main";
import { BlogStore } from "../store/BlogStore";

export default function BlogPage() {
  return (
    <Provider store={BlogStore}>
      <Header />
      <Main />
      <Footer />
    </Provider>
  );
}
