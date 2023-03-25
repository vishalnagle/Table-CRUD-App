import React, { useState } from "react";
import "./style.css";

const TableCrud = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John",
      email: "john@example.com",
      phone: "9999999999",
    },
    {
      id: 2,
      name: "Jane",
      email: "jane@example.com",
      phone: "9999999999",
    },
    {
      id: 3,
      name: "Bob",
      email: "bob@example.com",
      phone: "9999999999",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toggleButton, setToggleButton] = useState(true);
  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextPhone, setErrorTextPhone] = useState("");
  const [errorInputName, setErrorInputName] = useState(false);
  const [errorInputEmail, setErrorInputEmail] = useState(false);
  const [errorInputPhone, setErrorInputPhone] = useState(false);
  const [errorFormBorder, setErrorFormBorder] = useState(false);

  const handleToggleButton = () => {
    setToggleButton(!toggleButton);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formData.name.length > 0) {
      setErrorTextName("");
      setErrorInputName(false);
    }

    if (formData.email.length > 0) {
      setErrorTextEmail("");
      setErrorInputEmail(false);
    }

    if (formData.phone.length > 0 && formData.phone.length === 10) {
      setErrorTextPhone("");
      setErrorInputPhone(false);
    }
    if (formData.name && formData.email && formData.phone) {
      setErrorFormBorder(false);
    }

    // if (!/^[[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
    //   setErrorTextEmail("Please enter valid email");
    //   setErrorInputEmail(true);
    // }

    // if (formData.phone.length !== 10) {
    //   setErrorTextPhone("Enter 10 digit number");
    //   setErrorInputPhone(true);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setData(
        data.map((item) =>
          item.id === editingId ? { ...item, ...formData } : item
        )
      );
      setEditing(false);
    } else {
      if (formData.name && formData.email && formData.phone) {
        setData([...data, { id: data.length + 1, ...formData }]);
        setFormData({ name: "", email: "", phone: "" });
        setErrorFormBorder(false);
      }
    }

    if (!formData.name && !formData.email && !formData.phone) {
      setErrorTextName("Please enter name");
      setErrorTextEmail("Please enter email");
      setErrorTextPhone("Enter 10 digit number");
      setErrorInputName(true);
      setErrorInputEmail(true);
      setErrorInputPhone(true);
      setErrorFormBorder(true);
    }

    if (formData.name && !formData.email && !formData.phone) {
      setErrorTextEmail("Please enter email");
      setErrorTextPhone("Enter 10 digit number");
      setErrorInputEmail(true);
      setErrorInputPhone(true);
    }

    if (!formData.name && formData.email && !formData.phone) {
      setErrorTextName("Please enter name");
      setErrorTextPhone("Enter 10 digit number");
      setErrorInputName(true);
      setErrorInputPhone(true);
    }

    if (!formData.name && !formData.email && formData.phone) {
      setErrorTextName("Please enter name");
      setErrorTextEmail("Please enter email");
      setErrorInputName(true);
      setErrorInputEmail(true);
    }

    if (!formData.name && formData.email && formData.phone) {
      setErrorTextName("Please enter name");
      setErrorInputName(true);
    }
    if (formData.name && !formData.email && formData.phone) {
      setErrorTextEmail("Please enter email");
      setErrorInputEmail(true);
    }
    if (formData.name && formData.email && !formData.phone) {
      setErrorTextPhone("Enter 10 digit number");
      setErrorInputPhone(true);
    }
  };

  const handleEdit = (id) => {
    setFormData(data.find((item) => item.id === id));
    setEditing(true);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <>
      <div>
        <h1>Table CRUD App</h1>
        <button className="start-btn" onClick={handleToggleButton}>
          View Form
        </button>
        {toggleButton ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className={errorFormBorder ? "form-div-error" : "form-div"}>
              <h2>Add Details</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={
                    errorInputName ? "input-error-name" : "input-normal"
                  }
                />
                <p className="error-text">{errorTextName}</p>
                <br />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={
                    errorInputEmail ? "input-error-email" : "input-normal"
                  }
                />
                <p className="error-text">{errorTextEmail}</p>
                <br />
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  minLength="10"
                  className={
                    errorInputPhone ? "input-error-phone" : "input-normal"
                  }
                />
                <p className="error-text-phone">{errorTextPhone}</p>
                <br />
                <button type="submit" className="add-btn">
                  {editing ? "Update" : "Add"}
                </button>
              </form>
            </div>
          </div>
        ) : null}
        {formData ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            {data.length > 0 ? (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TableCrud;
