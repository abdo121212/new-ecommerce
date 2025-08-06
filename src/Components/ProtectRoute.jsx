// import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { UserContext } from "../Context/UserProvider";

export default function ProtectedRoute({ children }) {
  // let token = false;
  // const { token } = useContext(UserContext);
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
