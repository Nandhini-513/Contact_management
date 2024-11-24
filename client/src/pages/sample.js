// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const CreateContact = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     designation: "",
//     gender: "",
//     courses: [],
//     image: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setUserDetails({ ...userDetails, [name]: value });
//   };
//   // checkbox
//   const handleCheckboxChange = (event) => {
//     const { value, checked } = event.target;
//     setUserDetails((prevDetails) => {
//       const updatedCourses = checked
//         ? [...prevDetails.courses, value]
//         : prevDetails.courses.filter((course) => course !== value);
//       return { ...prevDetails, courses: updatedCourses };
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const res = await fetch("http://localhost:8000/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(userDetails),
//     });
//     const result = await res.json();
//     if (!result.error) {
//       console.log(result);
//       setUserDetails({
//         name: "",
//         email: "",
//         phone: "",
//         designation: "",
//         gender: "",
//         courses: [],
//         image: "",
//       });
//     } else {
//       console.log(result);
//     }
//   };

//   return (
//     <>
//       <h2 className="mt-4">Create your contact</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="nameInput" className="form-label mt-4">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="namelInput"
//             name="name"
//             value={userDetails.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="emailInput" className="form-label mt-4">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="emailInput"
//             name="email"
//             value={userDetails.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phoneInput" className="form-label mt-4">
//             Mobile No
//           </label>
//           <input
//             type="number"
//             className="form-control"
//             id="phoneInput"
//             name="phone"
//             value={userDetails.phone}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         {/* Temporary starts */}
//         {/* Dropdown for Designation */}
//         <div className="form-group">
//           <label htmlFor="designationInput" className="form-label mt-4">
//             Designation
//           </label>
//           <select
//             className="form-control"
//             id="designationInput"
//             name="designation"
//             value={userDetails.designation}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Designation</option>
//             <option value="hr">HR</option>
//             <option value="manager">Manager</option>
//             <option value="sales">Sales</option>
//           </select>
//         </div>

//         {/* Radio Buttons for Gender */}
//         <div className="form-group">
//           <label className="form-label mt-4">Gender</label>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="male"
//                 checked={userDetails.gender === "male"}
//                 onChange={handleInputChange}
//                 required
//               />
//               <span className="text-muted">Male</span>
//             </label>
//             <label className="ms-3">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 checked={userDetails.gender === "female"}
//                 onChange={handleInputChange}
//                 required
//               />
//               <span className="text-muted">Female</span>
//             </label>
//           </div>
//         </div>

//         {/* Checkboxes for Courses */}
//         <div className="form-group">
//           <label className="form-label mt-4">Course</label>
//           <div>
//             <label>
//               <input
//                 type="checkbox"
//                 value="mca"
//                 onChange={handleCheckboxChange}
//                 checked={userDetails.courses.includes("mca")}
//                 className="text-muted"
//               />
//               <span className="text-muted"> MCA</span>
//             </label>
//             <label className="ms-3">
//               <input
//                 type="checkbox"
//                 value="bca"
//                 onChange={handleCheckboxChange}
//                 checked={userDetails.courses.includes("bca")}
//                 className="text-muted"
//               />
//               <span className="text-muted">BCA</span>
//             </label>
//             <label className="ms-3">
//               <input
//                 type="checkbox"
//                 value="bsc"
//                 onChange={handleCheckboxChange}
//                 checked={userDetails.courses.includes("bsc")}
//                 className="text-muted"
//               />
//               <span className="text-muted">B.Sc</span>
//             </label>
//           </div>
//         </div>

//         {/* Image upload */}
//         <div className="form-group">
//           <label htmlFor="addressInput" className="form-label mt-4">
//             Image upload
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="addressInput"
//             name="address"
//             value={userDetails.address}
//             onChange={handleInputChange}
//             placeholder="Gandhi Nagar"
//             required
//           />
//         </div>
//         {/* Temporary ends */}

//         <input
//           type="submit"
//           value="Add Contact"
//           className="btn btn-info mt-3"
//         ></input>
//       </form>
//     </>
//   );
// };

// export default CreateContact;
