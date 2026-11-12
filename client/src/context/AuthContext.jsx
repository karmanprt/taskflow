import { createContext } from "react";

// Create a context object.
// This will be shared between AuthProvider and components
// that need authentication information.
const AuthContext = createContext(null);

// Export it so other files can use the same context object.
export default AuthContext;
