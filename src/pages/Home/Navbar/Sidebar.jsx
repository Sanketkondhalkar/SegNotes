import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ toggale, removenav }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast("you have successfully loged out ");
    removenav();
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?._id;
  return (
    <div
      className="left"
      style={{
        width: toggale ? "17%" : "0%",
        // display: toggale ? "block" : "none",
      }}
    >
      {toggale && (
        <nav className="sidebar">
          <div className="menu_content">
            <ul className="menu_items">
              <div className="menu_title menu_dahsboard"></div>
              <Link to="/">
                <li className="item">
                  <div href="#" className="nav_link submenu_item">
                    <span className="navlink_icon">
                      <i className="fa fa-home"></i>
                    </span>

                    <span className="navlink">All Notes</span>
                    <i className="bx bx-chevron-right arrow-left"></i>
                  </div>
                </li>
              </Link>
              <Link to="/createnote">
                <li className="item">
                  <div href="#" className="nav_link submenu_item">
                    <span className="navlink_icon">
                      <i className="fa fa-edit"></i>
                    </span>
                    <span className="navlink">Create Note</span>
                    <i className="bx bx-chevron-right arrow-left"></i>
                  </div>
                </li>
              </Link>
              <Link to={`/userallnote/${user_id}`}>
                <li className="item">
                  <div href="#" className="nav_link submenu_item">
                    <span className="navlink_icon">
                      <i className="fa fa-users"></i>
                    </span>
                    <span className="navlink">Personal Note</span>
                    <i className="bx bx-chevron-right arrow-left"></i>
                  </div>
                </li>
              </Link>
            </ul>

            {/* <!-- Sidebar Open / Close --> */}
            <div className="bottom_content">
              <div className="bottom expand_sidebar">
                <span> Expand</span>
                <i className="bx bx-log-in"></i>
              </div>
              <div className="bottom collapse_sidebar" onClick={logout}>
                <span> Logout</span>
                <i className="bx bx-log-out"></i>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
