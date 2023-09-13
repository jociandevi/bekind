import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const AuthContext = createContext<any>({});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  let defaultValue = null;

  const retrievedData = Cookies.get("googleResponseData");
  if (retrievedData) {
    const parsedData = JSON.parse(retrievedData);
    defaultValue = parsedData;
  }

  const [user, setUser] = useState<any>(defaultValue);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
