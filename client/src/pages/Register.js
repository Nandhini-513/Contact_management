import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCreadentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreadentials({ ...credentials, [name]: value });
  };

  const handlesubmit = (event) => {
    event.preventDefault();

    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("Please enter all required fields");
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password Doesnt match");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };

    registerUser(userData);
  };
  return (
    <>
      {/* <ToastContainer autoClose={2000} /> */}
      <h3 className="mt-4">Create Your account</h3>
      <form onSubmit={handlesubmit}>
        <div>
          <label htmlFor="nameInput" className="form-label mt-4">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="nameInput"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </div>
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
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="form-label mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter password"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary my-3"
        ></input>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
