import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../Services/authApi";
import { toast } from "react-toastify";

const Login = ({ rerender }) => {
  const [loginApi] = useLoginMutation();
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });
  const inputhandeller = (e) => {
    setlogindata({ ...logindata, [e.target.name]: e.target.value });
  };
  const sumbmitdata = async (e) => {
    e.preventDefault();
    const response = await loginApi(logindata);
    // console.log(response);
    if (response?.data?.success) {
      toast(response?.data?.message);
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      navigate("/");
      rerender();
    } else {
      toast.error(response?.data?.message);
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="bg-img">
        <div className="content">
          <header>Sign in</header>
          <form action="#">
            <div className="field">
              <span className="fa fa-user"></span>
              <input
                type="text"
                required
                placeholder="Email or Phone"
                name="email"
                value={logindata.email}
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
                value={logindata.password}
                onChange={inputhandeller}
              />
              {/* <span className="show">SHOW</span> */}
            </div>
            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="field">
              <input
                type="submit"
                value="LOGIN"
                onClick={(e) => sumbmitdata(e)}
              />
            </div>
          </form>
          <div className="login">Or login with</div>
          <div className="links">
            <div className="facebook">
              <i className="fab fa-facebook-f">
                <span>Facebook</span>
              </i>
            </div>
            <div className="instagram">
              <i className="fab fa-instagram">
                <span>Instagram</span>
              </i>
            </div>
          </div>
          <div className="signup">
            Don't have account? <Link to="/register">Signup Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
