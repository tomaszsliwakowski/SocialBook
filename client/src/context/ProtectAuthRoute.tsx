import { CSSProperties, ReactNode, useContext } from "react";
import { AuthContext, UserAuth } from "./Auth";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function ProtectAuthRoute({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { User, loading }: UserAuth = useContext(AuthContext);

  if ((!loading && User.email === "") || User.id === null) navigate("/");

  if (loading)
    return (
      <div className="loader">
        <ClipLoader
          color="#3a86ff"
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="ClipLoader"
          speedMultiplier={0.6}
        />
      </div>
    );
  if (User.email !== "" && User.id && !loading) return <>{children}</>;
}
