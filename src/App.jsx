import React, { useEffect, useState } from "react";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home/Home";
import NoPage from "./pages/Home/NoPage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./pages/Home/Navbar/Navbar";
import Createnote from "./pages/Home/Createnote/Createnote";
import UserAllNotes from "./pages/Home/UserAllNotes/UserAllNotes";
import Sidebar from "./pages/Home/Navbar/Sidebar";

const App = () => {
  const [toggale, settoggle] = useState(true);

  const [local, setLocal] = useState(JSON.parse(localStorage.getItem("user")));

  const toggaldata = () => {
    settoggle(!toggale);
  };
  const rerender = () => {
    setLocal(JSON.parse(localStorage.getItem("user")));
  };

  const removenav = () => {
    setLocal("");
  };
  return (
    <BrowserRouter>
      {local && <Navbar toggaldata={toggaldata} />}
      <Routes>
        <Route
          index
          path="/"
          element={<Home toggale={toggale} removenav={removenav} />}
        />
        <Route path="/login" element={<Login rerender={rerender} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/createnote"
          element={<Createnote toggale={toggale} removenav={removenav} />}
        />

        <Route
          path="/userallnote/:id"
          element={<UserAllNotes toggale={toggale} removenav={removenav}  />}
        />

        <Route path="*" element={<NoPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
