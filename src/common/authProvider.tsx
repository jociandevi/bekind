import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>({});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  let defaultValue = null;

  const retrievedData = Cookies.get("googleResponseData");
  if (retrievedData) {
    const parsedData = JSON.parse(retrievedData);
    console.log("googleResponseData cookie does make sense!", parsedData);
    defaultValue = parsedData;
  }

  const [user, setUser] = useState<any>(defaultValue);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
