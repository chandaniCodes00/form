import React from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  );
  const [errors, setErrors] = useState("");
  // manage input changes
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    });
  };
  // form validation
  const validationForm = () => {
    let error = "";
    if (formData.name !== "" && /^[a-zA-Z ]+$/.test(formData.name)) {
      if (formData.email !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        if (formData.phone !== "" && /^[0-9]{10}$/.test(formData.phone)) {
          if (formData.password !== "" && formData.password.length >= 6) {
            if (formData.confirmPassword === formData.password) {
              error = "";
            } else {
              error = "Password does not match";
            }
          } else {
            error = "Enter valid password with at least 6 digits";
          }
        } else {
          error = "Enter valid 10 digit phone number";
        }
      } else {
        error = "Enter valid email";
      }
    } else {
      error = "Enter valid name";
    }

    setErrors(error);
    return error === "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/students/register",

          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          });
        alert(response.data.message || "registration Successful");
        setFormData(
          {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""

          }
        );
        setErrors("");
      } catch (error) {
        setErrors(
          error.response?.data?.message || "something went wrong"
        );
      }
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:  </label>
        <input name="name" type="text" placeholder="Enter Name" value={formData.name} onChange={handlerChange} ></input>
        <label>Email:  </label>
        <input name="email" type="text" placeholder="Enter Email" value={formData.email} onChange={handlerChange} ></input>
        <label>Mobile No:</label>
        <input name="phone" type="text" placeholder="Enter Mobile No" value={formData.phone} onChange={handlerChange} ></input>
        <label>Password:</label>
        <input name="password" type="password" placeholder="Enter Password" value={formData.password} onChange={handlerChange} ></input>
        <label>Confirm Password: </label>
        <input name="confirmPassword" type="Password" placeholder="Enter ConfirmPassword" value={formData.confirmPassword} onChange={handlerChange} ></input>
        <p style={{ color: "red" }}>{errors}</p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default App;