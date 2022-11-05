import React from "react";
import { Routes, Route } from "react-router-dom";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import Home from "./Pages/Home/Home";
import Tags from "./Pages/Tags/Tags";
import Questions from "./Pages/Questions/Questions";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Auth from "./Pages/Auth/Auth";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Questions" element={<Questions />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="Questions/:id" element={<DisplayQuestion />} />
    <Route path="/Users" element={<Users />} />
      <Route path="/Users/:id" element={<UserProfile />} />
    </Routes>
  );
}

export default AllRoutes;
