import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { LOGIN_PATH, SECURE_PATH } from "constants";
import { selectAuth } from "store/reducers/auth";
import { init } from "store/actions/auth";

const useInit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { initLoaded } = useSelector(selectAuth());
  const loading = !initLoaded;

  useEffect(() => {
    if (!initLoaded) {
      dispatch(init()).then(() => {
        if (location?.pathname === LOGIN_PATH)
          navigate(SECURE_PATH, { replace: true });
      });
    }
  }, [initLoaded]); // eslint-disable-line

  return loading;
};

export default useInit;
