import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({id,...userDetails}),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      setUserDetails({ name: "", address: "", email: "", phone: "" });
      navigate("/mycontacts")
    } else {
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchContactDetails = async () => {
      try {
        console.log(id + "above fetch statement");
        const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        setUserDetails({
          name: result.name,
          email: result.email,
          address: result.address,
          phone: result.phone,
        });
        console.log(result);
        setLoading(false)
      } catch (error) {
        console.log(error);
        console.log(id);
      }
    };
    fetchContactDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your contact</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="namelInput"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="Viyan"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressInput" className="form-label mt-4">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="Gandhi Nagar"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="xyz@gmail.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput" className="form-label mt-4">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="+91 9852462521"
                required
              />
            </div>

            <input
              type="submit"
              value="Save changes"
              className="btn btn-info mt-3"
            ></input>
          </form>
        </>
      )}
    </>
  );
};
export default EditContact;
