import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token,setToken] = useState("");

  // useEffect(() => {
  //   let storedToken = (localStorage.getItem("token"))
  //   setToken(storedToken)
  // }, [])

  // useEffect(() => {
  //   if (token) {
  //     let decodedData = (jwtDecode(token))
  //     setUser(decodedData)
  //     console.log("decoded data: ", decodedData)
  //   } else {
  //     console.log("No token found")
  //   }
  // }, [token])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
