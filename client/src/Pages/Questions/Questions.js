import React from "react";
import Homebar from "../../Components/Homebar/Homebar";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";

function Questions() {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <Homebar />
        <RightSidebar />
      </div>
    </div>
  );
}

export default Questions;
