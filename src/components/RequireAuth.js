import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "store/reducers/auth";

const RequireAuth = ({ children, redirectTo }) => {
  const location = useLocation();
  const { initLoaded, loggedIn } = useSelector(selectAuth());
  if (!initLoaded) return null;

  return loggedIn ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} />
  );
};

export default RequireAuth;
