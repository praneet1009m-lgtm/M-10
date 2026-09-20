import React from "react";
import SplineScene from "./Spline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Video = () => {
  return (
    <div className="h-full w-full">
      <SplineScene />
    </div>
  );
};

export default Video;
