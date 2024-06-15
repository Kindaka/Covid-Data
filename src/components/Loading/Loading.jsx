import React from "react";
import "./LoadingScreen.scss";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
};

export default Loading;