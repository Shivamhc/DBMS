import React from "react";
import { Update } from "../Components/Update";

export const UpdateRestaurants = () => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <h3
        className="text-center"
        style={{
          marginTop: "30px",
          marginRight: "250px",
          marginLeft: "250px",
          marginBottom: "50px",
          paddingTop: "10px",
          paddingBottom: "15px",
          backgroundColor: "rgb(255, 212, 148)",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.7)",
          borderRadius: "1rem",
          transition: "0.3s",
          fontFamily: "Geneva",
          textAlign: "Center",
        }}
      >
        Update Restaurant's Details
      </h3>
      <Update />
    </div>
  );
};
