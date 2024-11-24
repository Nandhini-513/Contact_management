import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import "../styles/Navbar.css";
const Navbar = ({ title = "Home" }) => {
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary text-uppercase"
      data-bs-theme="dark"
    >
      <div className="container-fluid text-uppercase">
        <Link to="/" className="navbar-brand">
          {title}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item nav-link">{user ? user.name : null}</li>
                <li className="nav-item ">
                  <Link to="/mycontacts">
                    <a className="nav-link" style={{ textDecoration: "none" }}>
                      Employee List
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create">
                    <a className="nav-link ">Create</a>
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button className="btn btn-danger text-uppercase">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <a className="nav-link"> Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
