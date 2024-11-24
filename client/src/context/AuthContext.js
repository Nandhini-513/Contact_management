import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";
import { replace, useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  //Login request

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        } else {
          navigate(location.pathname ? location.pathname : "/m ");
        }
        setUser(result);
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      setUser(result);

      if (!result.error) {
        // console.log(result);
        localStorage.setItem("token", result.token);
        setUser(result.user);
        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          navigate("/", { replace: true });
        }
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   register request
  const registerUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success("User registered Successfully! login into your account");
        navigate("/login", { replace: true });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}>
      <ToastContainer autoclose={2000} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
