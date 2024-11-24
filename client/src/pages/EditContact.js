import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    courses: [],
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setUserDetails((prevDetails) => {
      const updatedCourses = checked
        ? [...prevDetails.courses, value]
        : prevDetails.courses.filter((course) => course !== value);
      return { ...prevDetails, courses: updatedCourses };
    });
  };

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
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      setUserDetails({ name: "", address: "", email: "", phone: "" });
      navigate("/mycontacts");
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

        const updatedUserDetails = {
          name: result.name,
          email: result.email,
          address: result.address,
          phone: result.phone,
          courses: Array.isArray(result.courses) ? result.courses : [], // Ensure courses is an array
        };

        setUserDetails(updatedUserDetails);
        console.log(result);
        setLoading(false);
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
            <div className="form-group row align-items-center mb-3">
              <label htmlFor="nameInput" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div className="form-group row align-items-center mb-3">
              <label htmlFor="emailInput" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group row align-items-center mb-3">
              <label htmlFor="phoneInput" className="col-sm-2 col-form-label">
                Mobile No
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="phoneInput"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            
            {/* Designation */}
            <div className="form-group row align-items-center mb-3">
              <label
                htmlFor="designationInput"
                className="col-sm-2 col-form-label"
              >
                Designation
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="designationInput"
                  name="designation"
                  value={userDetails.designation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className="form-group row align-items-center mb-3">
              <label className="col-sm-2 col-form-label">Gender</label>
              <div className="col-sm-10">
                <div>
                  <label className="me-3">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={userDetails.gender === "male"}
                      onChange={handleInputChange}
                      required
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={userDetails.gender === "female"}
                      onChange={handleInputChange}
                      required
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="form-group row align-items-center mb-3">
              <label className="col-sm-2 col-form-label">Courses</label>
              <div className="col-sm-10">
                <label className="me-3">
                  <input
                    type="checkbox"
                    value="mca"
                    onChange={handleCheckboxChange}
                    checked={userDetails.courses.includes("mca")}
                  />
                  MCA
                </label>
                <label className="me-3">
                  <input
                    type="checkbox"
                    value="bca"
                    onChange={handleCheckboxChange}
                    checked={userDetails.courses.includes("bca")}
                  />
                  BCA
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="bsc"
                    onChange={handleCheckboxChange}
                    checked={userDetails.courses.includes("bsc")}
                  />
                  B.Sc
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-group row align-items-center mb-3">
              <label htmlFor="imageInput" className="col-sm-2 col-form-label">
                Image
              </label>
              <div className="col-sm-10">
                <input
                  type="file"
                  className="form-control"
                  id="imageInput"
                  name="image"
                  accept="image/jpeg, image/png"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  required
                />
              </div>
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
