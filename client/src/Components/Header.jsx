//rafc
import React from "react";

export const Header = () => {
  return (
    <div
      class="card mr-auto"
      style={{
        marginTop: "10px",
        backgroundColor: "#f4f3cc",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.8)",
        transition: "0.3s",
        // fontFamily: "Thirsty Soft",
      }}
    >
      <h1 className="font-weight-light display-1 text-center mb-5 ">
        <strong>Restaurant Finder</strong>
      </h1>
    </div>
  );
};
