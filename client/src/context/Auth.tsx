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

export type UserType = {
  id: string;
  name: string;
  email: string;
  followers: string[];
  observed: string[];
};
export interface UserAuth {
  User: UserType;
  refetch: Function;
  loading: boolean;
}

export const AuthContext = createContext<UserAuth>({
  User: { id: "", name: "", email: "", followers: [], observed: [] },
  refetch: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [User, setUser] = useState<UserType>({
    id: "",
    name: "",
    email: "",
    followers: [],
    observed: [],
  });

  const { loading, error, data, refetch } = useQuery(GET_USER);

  useEffect(() => {
    if (!loading && !error && data) {
      setUser({
        id: data.GetUser.id,
        name: data.GetUser.name,
        email: data.GetUser.email,
        followers: data.GetUser.followers,
        observed: data.GetUser.observed,
      });
    }
  }, [data]);

  if (error)
    return (
      <div className="error__page">
        <h1>Something Went Wrong!</h1>
        <a href="/">Go Home Page</a>
      </div>
    );

  return (
    <AuthContext.Provider value={{ User, refetch, loading }}>
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
