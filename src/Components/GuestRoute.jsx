// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../Context/UserProvider";

export default function GuestRoute({ children }) {
  // const { token } = useContext(UserContext);

  if (!localStorage.getItem("token")) {
    return children;
  }
}
