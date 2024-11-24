import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateContact = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    courses: [],
  });
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setUserDetails((prevDetails) => {
      const updatedCourses = checked
        ? [...prevDetails.courses, value]
        : prevDetails.courses.filter((course) => course !== value);
      return { ...prevDetails, courses: updatedCourses };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(userDetails).forEach((key) => {
      if (key === "courses") {
        userDetails.courses.forEach((course) =>
          formData.append("courses[]", course)
        );
      } else {
        formData.append(key, userDetails[key]);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/contact",
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // body: JSON.stringify(userDetails),
        }
      );
      setSuccessMessage("Contact created successfully!");
        // console.log(result);
        setUserDetails({
          name: "",
          email: "",
          phone: "",
          designation: "",
          gender: "",
          courses: [],
        });
        setImage(null);
      
    } catch (err) {
      console.log("Error creating contact", err);
      setErrorMessage(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <h2 className="mt-4">Create your contact</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="container mt-3">
        {/* Name */}
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
          <label htmlFor="designationInput" className="col-sm-2 col-form-label">
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

        <button type="submit" className="btn btn-info">
          Add Contact
        </button>
      </form>
    </>
  );
};

export default CreateContact;
