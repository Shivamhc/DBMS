import React from "react";

export const Header = () => {
  return (
    <div style={{ paddingTop: "50px" }}>
      <div
        className="card mr-auto"
        style={{
          backgroundColor: "rgb(225, 225, 225)",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.8)",
          transition: "0.3s",
          marginBottom: "50px",
          fontFamily: "Comic Sans Ms",
          background: "hsla(340, 80%, 69%, 1)",
          background:
            "linear-gradient(135deg, hsla(340, 80%, 69%, 1) 0%, hsla(15, 93%, 71%, 1) 76%)",
        }}
      >
        <h1 className="font-weight-light display-1 text-center mb-3 ">
          <strong>Restaurant Finder</strong>
        </h1>
      </div>
    </div>
  );
};
