import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from './RefreshToken';
import { useAuth } from "./AuthContext";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const accessToken = await refresh();
        console.log('accessToken:', accessToken);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [auth?.accessToken, persist, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log("authToken (from persistLogin):", auth?.user?.jwt?.token);

    if (!auth?.user?.jwt && persist) {
      navigate('/');
    }
  }, [isLoading]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistLogin;
