import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Spinner from "./Spinner";
import "../styles/AllContact.css";

const AllContact = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [ModalData, setModalData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/mycontacts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchContact();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure to delete this contact?")) {
      try {
        console.log(ModalData._id);
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          console.log(result);
          setShowModal(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setContacts(newSearchUser);
  };

  return (
    <>
      <div>
        <h1 className="text-uppercase mt-4">Your contacts</h1>
        <a href="/mycontacts" className="btn btn-danger my-2">
          Reload Contact
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? (
              <h3>No Contacts Created</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  ></input>
                  <button type="submit" className="btn btn-info my-2 border-0">
                    Search
                  </button>
                </form>
                <p className="text-muted">
                  Your Total contacts:<strong>{contacts.length} </strong>
                </p>
                <table className="table table-hover border-bottom">
                  <thead className="text-uppercase">
                    <tr className="table-primary">
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.designation}</td>
                        <td>{contact.courses}</td>
                        <td>{contact.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ModalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Email :</strong> {ModalData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {ModalData.phone}
          </p>
          <p>
            <strong>Designation:</strong> {ModalData.designation}
          </p>
          <p>
            <strong>Courses:</strong> {ModalData.courses?.join(", ")}
          </p>
          {ModalData.image && (
            <p>
              <strong>Image:</strong>{" "}
              <img
                src={`http://localhost:8000/${ModalData.image}`}
                alt="contact"
                width="150"
              />
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${ModalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(ModalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;
