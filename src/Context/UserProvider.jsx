import { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
