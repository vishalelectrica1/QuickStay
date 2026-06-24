import { createContext,useState } from "react";

const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";
      const [loading, setLoading] = useState(false);

      const value = {
        serverUrl,
        loading,
        setLoading
      };

  return (
    <authDataContext.Provider value={ value }>
      {children}
    </authDataContext.Provider>
  );
}

export { authDataContext };
export default AuthContext;
