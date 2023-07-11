import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Navbar/Sidebar";
import { useAllNoteQuery } from "../../../Services/noteApi";

const Home = ({ toggale, removenav }) => {
  const { isError, isFetching, isLoading, data, refetch } = useAllNoteQuery();
  const mapdata = data?.data;
  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      navigate("/login");
    }
    refetch();
  }, []);

  return (
    <>
      <div className="demo">
        <Sidebar toggale={toggale} removenav={removenav} />
        <div className="right home" style={{ width: toggale ? "83%" : "100%" }}>
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
          ) : (
            <>
              {mapdata?.map((item) => {
                return (
                  <div className="box" key={item._id}>
                    <div className="image">
                      <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
                    </div>
                    <div className="name_job" style={{ textAlign: "center" }}>
                      {item.title}
                    </div>
                    <p>{item.content}</p>
                    {item?.user?.name && (
                      <div
                        className="name_job"
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          color: "red",
                        }}
                      >
                        "{item?.user?.name}"
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
