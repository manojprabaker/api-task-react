import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
