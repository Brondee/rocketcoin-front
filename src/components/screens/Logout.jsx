import React, { useCallback, useEffect } from "react";
import { useLogoutMutation } from "../../store/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const logoutFunc = useCallback(async () => {
    const { data } = await logout();
    if (data) {
      sessionStorage.setItem("accessToken", null);
      sessionStorage.setItem("refreshToken", null);
      dispatch(logOut());
      navigate("/");
    }
  }, [dispatch, logout, navigate]);

  useEffect(() => {
    logoutFunc();
  }, [logoutFunc]);

  return <div>Logout</div>;
};

export default Logout;
