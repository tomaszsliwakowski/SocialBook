import { useQuery } from "@apollo/client";
import {
  CSSProperties,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { GET_USER } from "../Query/userQuery";
import { ClipLoader } from "react-spinners";
import "../index.css";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

type UserType = {
  name: string;
  email: string;
};
export interface UserAuth {
  User: UserType;
  refetch: Function;
}

export const AuthContext = createContext<UserAuth>({
  User: { name: "", email: "" },
  refetch: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [User, setUser] = useState<UserType>({
    name: "",
    email: "",
  });

  const { loading, error, data, refetch } = useQuery(GET_USER);

  useEffect(() => {
    if (!loading && !error && data) {
      setUser({ name: data.GetUser.name, email: data.GetUser.email });
    }
  }, [data]);

  if (error) return <div>Error</div>;

  return (
    <AuthContext.Provider value={{ User, refetch }}>
      {!loading ? (
        children
      ) : (
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
      )}
    </AuthContext.Provider>
  );
};
