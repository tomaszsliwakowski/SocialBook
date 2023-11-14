import { ReactNode, createContext, useEffect, useState } from "react";

type UserType = {
  id: string;
  name: string;
  email: string;
};
export interface UserAuth {
  User: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export const AuthContext = createContext<UserAuth>({
  User: { id: "", name: "", email: "" },
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [User, setUser] = useState<UserType>({
    id: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    console.log(User);
  }, [User]);

  return (
    <AuthContext.Provider value={{ User, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
