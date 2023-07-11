import React, { useEffect, useState } from "react";
import Sidebar from "../Navbar/Sidebar";
import "../UserAllNotes/UserAllNotes.css";
import { useParams } from "react-router-dom";
import {
  useDeleteNoteMutation,
  useUserAllNoteQuery,
} from "../../../Services/noteApi";
import { toast } from "react-toastify";
import Updatemodel from "../Updatemodel/Updatemodel";

const UserAllNotes = ({ toggale, removenav }) => {
  const [currentdata, setcurrentdata] = useState();
  const [flag, setflag] = useState(false);
  const { id } = useParams();

  const { isError, isLoading, isSuccess, data, refetch } =
    useUserAllNoteQuery(id);
  const mapdata = data?.data;

  const [deletenote, { isLoading: loading }] = useDeleteNoteMutation();

  useEffect(() => {
    refetch();
  }, []);
  const deletedata = async (id) => {
    const response = await deletenote(id);
    // console.log(response);
    if (response?.data?.success) {
      refetch();
      toast(response?.data?.message);
    } else {
      toast(response?.data?.message);
    }
  };
  const setmodel = (value, data) => {
    setflag(value);
    setcurrentdata(data);
  };

  return (
    <div className="demo">
      <Sidebar toggale={toggale} removenav={removenav} />
      <div
        className="right userallnotes"
        style={{ width: toggale ? "83%" : "100%" }}
      >
        {isLoading ? (
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : loading ? (
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            {mapdata?.map((item) => {
              return (
                <div className="box" key={item._id}>
                  <div className="image">
                    <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
                  </div>
                  <div className="name_job">{item.title}</div>

                  <p>{item.content}</p>
                  <div className="btns">
                    <button onClick={() => setmodel(true, item)}>Update</button>
                    <button onClick={() => deletedata(item._id)}>Delete</button>
                  </div>
                </div>
              );
            })}
            {flag && (
              <Updatemodel
                currentdata={currentdata}
                setmodel={setmodel}
                setflag={setflag}
                refetch={refetch}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserAllNotes;
