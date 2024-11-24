import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1 className="text-uppercase" >Welcome Admin Panel</h1>
       
        <hr className="my-4"/>
        <Link className="btn btn-info btn-lg" role="button" to="/create"> 
        ADD CONTACTS
        </Link>
        
      </div>
    </>
  );
};

export default Home;
