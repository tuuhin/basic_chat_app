import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import "./index.css";
import JoinContext from "../src/context/joinContext";
ReactDOM.render(
  <React.StrictMode>
    <JoinContext>
      <App />
    </JoinContext>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
