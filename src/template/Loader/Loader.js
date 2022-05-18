import { Image } from "antd";
import React from "react";
import loader from "../../assets/images/sample.gif";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
