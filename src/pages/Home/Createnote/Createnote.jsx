import React, { useState } from "react";
import Sidebar from "../Navbar/Sidebar";
import "../Createnote/Createnote.css";
import { useCreateNoteMutation } from "../../../Services/noteApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Createnote = ({ toggale, removenav }) => {
  const userdata = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [createApi, { isLoading, isError, isSuccess }] =
    useCreateNoteMutation();
  const [note, setnote] = useState({
    title: "",
    content: "",
  });
  const inputhadeller = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const Submitdata = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?._id;
    const newobject = { ...note, user: user_id };
    // console.log(newobject);
    const response = await createApi(newobject);
    console.log(response);
    if (response?.data?.success) {
      toast(" your note has been successfully created ");
      navigate("/");
    } else {
      toast.error(response?.error?.data?.message);
    }
  };

  return (
    <div className="demo">
      <Sidebar toggale={toggale} removenav={removenav} />
      <div
        className="right craetenote_right"
        style={{ width: toggale ? "83%" : "100%" }}
      >
        <div className="note_box">
          <div className="user_details">
            <img
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
              alt=""
            />
            <div className="user_name">
              <p className="user">{userdata?.name}</p>
              <p>user Id : {userdata?._id}</p>
            </div>
          </div>
          <div className="notebody">
            <input
              type="text"
              id="inputbox1"
              placeholder="Enter your Title"
              name="title"
              onChange={inputhadeller}
              value={note.title}
            />
            <textarea
              id=" inputbox2"
              rows="8"
              // cols="81"
              placeholder="Enter Your Contet"
              name="content"
              onChange={inputhadeller}
              value={note.content}
            ></textarea>
            <button className="Note" onClick={Submitdata}>
              {isLoading ? (
                <section className="dots-container">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </section>
              ) : (
                " Create Note"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createnote;
