import React, { useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../Services/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const [registerApi] = useRegisterMutation();
  const navigate = useNavigate();
  const [registedata, setregisterdata] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const inputhandeller = (e) => {
    setregisterdata({ ...registedata, [e.target.name]: e.target.value });
  };
  const sumbmitdata = async (e) => {
    e.preventDefault();
    const response = await registerApi(registedata);
    console.log(response);
    if (response?.data?.success) {
      toast(response?.data?.message);
      navigate("/login");
    } else {
      toast.error(response?.data?.message);
    }
  };
  return (
    <div className="bg-img">
      <div className="content">
        <header>Sign Out</header>
        <form action="#">
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Enter your name"
              name="name"
              value={registedata.name}
              onChange={inputhandeller}
            />
          </div>
          <div className="field field_demo">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Enter Email"
              name="email"
              value={registedata.email}
              onChange={inputhandeller}
            />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Password"
              name="password"
              value={registedata.password}
              onChange={inputhandeller}
            />
            {/* <span className="show">SHOW</span> */}
          </div>
          <div className="field field_demo">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Eneter your age"
              name="age"
              value={registedata.age}
              onChange={inputhandeller}
            />
          </div>

          <div className="pass">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="field">
            <input
              type="submit"
              value="REGISETR"
              onClick={(e) => sumbmitdata(e)}
            />
          </div>
        </form>

        <div className="signup" style={{ marginTop: "20PX" }}>
          Don't have account? <Link to="/login">Signup Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
