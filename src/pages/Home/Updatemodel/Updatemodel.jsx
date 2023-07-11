import React, { useState } from "react";
import "../Updatemodel/Updatemodel.css";
import { useUpdateNoteMutation } from "../../../Services/noteApi";
import { toast } from "react-toastify";

const Updatemodel = ({ currentdata, setmodel, setflag, refetch }) => {
  const userdata = JSON.parse(localStorage.getItem("user"));

  const [updateApi] = useUpdateNoteMutation(currentdata?._id);
  const [note, setnote] = useState({
    title: currentdata?.title,
    content: currentdata?.content,
    // user: currentdata?.user,
  });
  const inputhadeller = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const Submitdata = async () => {
    const data = { ...note };
    const newobject = { data, _id: currentdata._id };
    const response = await updateApi(newobject);
    if (response?.data?.success) {
      refetch();
      toast("your note has been successfully updated");
      setflag(false);
    } else {
      toast("your note has been not updated");
    }
  };
  return (
    <div className="popup">
      <div className="note_box">
        <div className="user_details">
          <img
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            alt=""
          />
          <div className="user_name">
            <p className="user">{userdata?.name}</p>
            <p style={{ marginTop: "10px" }}>user Id : {userdata?._id}</p>
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
            {/* {isLoading ? "Loading" : " Create Note"} */}
            Update Note
          </button>
          <button className="Note" onClick={() => setmodel(false)}>
            {/* {isLoading ? "Loading" : " Create Note"} */}
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updatemodel;
