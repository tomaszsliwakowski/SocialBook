import { Link } from "react-router-dom";
import AuthSection from "../components/SignInUp/AuthSection";
import "../components/SignInUp/SignInUp.css";

export default function AuthPage() {
  return (
    <>
      <div className="logo">
        <Link to="/">
          <strong>S</strong>ocial<strong>B</strong>ook
        </Link>
      </div>
      <AuthSection />
    </>
  );
}
