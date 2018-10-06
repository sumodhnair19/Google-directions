import React from "react";
import "./loader.css";
import img from '../../logo.svg';

const Loader = ({showLoader}) => (
  <div className={showLoader ? 'loader-container ' : 'loader-container hide'}>
  <div className="loader" > <img alt="loader" src={img}/>
  < /div>
</div>);


export { Loader };
