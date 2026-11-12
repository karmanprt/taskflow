import { useContext } from "react";
import AuthContext from "./AuthContext";

// Custom hook to access authentication context
export default function useAuth() {
  return useContext(AuthContext);
}
