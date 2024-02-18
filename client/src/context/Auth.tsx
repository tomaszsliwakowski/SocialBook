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

export type FollowerObjectType = {
  user_id: string;
  followers_id: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  followers: FollowerObjectType[];
  observed: FollowerObjectType[];
};
export interface UserAuth {
  User: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  refetchUser: Function;
  loading: boolean;
}

export const AuthContext = createContext<UserAuth>({
  User: { id: "", name: "", email: "", followers: [], observed: [] },
  refetchUser: () => {},
  loading: true,
  setUser: () => {},
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
  const refetchUser = refetch;
  useEffect(() => {
    if (!loading && !error && data) {
      const { id, name, email, followers, observed } = data.getUser;
      setUser({
        id: id,
        name: name,
        email: email,
        followers: followers,
        observed: observed,
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
    <AuthContext.Provider value={{ User, refetchUser, loading, setUser }}>
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
