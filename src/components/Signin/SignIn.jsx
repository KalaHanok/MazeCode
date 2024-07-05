import { useState } from "react";
import "./styles.css";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (form.name === "" || form.email === "") {
      alert("Please fill all the fields");
      return;
    } else {
      localStorage.setItem("email", form.email);
      const res = await axios.post(
        `https://www.hackerrank.com/x/api/v3/tests/1932137/candidates`,
        {
          email: form.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer b071440abc04e134d53d1fc493015c899e1f4a43579d2f14b85caded916d136c",
          },
        }
      );

      localStorage.setItem("link", res.data.test_link);
      navigate("/");
    }
  };

  return (
    <div className="auth_container">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <div className="label">
          <label htmlFor="name">Full Name</label>
          <input
            onChange={handleChange}
            type="text"
            required
            placeholder="Enter your full name"
            name="name"
          />
        </div>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            required
            placeholder="Enter your email id"
            name="email"
          />
        </div>

        <button>Next</button>
      </form>
    </div>
  );
};

export default SignIn;
