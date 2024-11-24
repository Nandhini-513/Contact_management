import { useContext, useState } from "react";
import { Link } from "react-router-dom";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
const Login = () => {
  const { toast } = useContext(ToastContext);
  const { loginUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
// 
    

    if (!credentials.email || !credentials.password) {
      toast.error("please enter all the required fields");
      return;
    }

    loginUser(credentials);
    
    
  };

  return (
    <>
      {/* <ToastContainer autoClose={2000} /> */}
      <h3 className="mt-3">Login</h3>
      <form onSubmit={handlesubmit}>
        <div>
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div>
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary my-3"
        ></input>
        <p>
          Don't have a account ? <Link to="/register">Create One</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
