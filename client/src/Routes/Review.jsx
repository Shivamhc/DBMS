import React from "react";
import AddReview from "../Components/AddReview";

const Review = () => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <h3
        className="text-left"
        style={{
          marginTop: "30px",
          marginRight: "90px",
          marginBottom: "50px",
          paddingTop: "10px",
          paddingLeft: "20px",
          paddingBottom: "15px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.7)",
          borderRadius: "1rem",
          transition: "0.3s",
          fontFamily: "Century Gothic",
          backgroundColor: "#AC8D9A",
          background: "hsla(335, 16%, 61%, 1)",
          background:
            "linear-gradient(90deg, hsla(335, 16%, 61%, 1) 0%, hsla(333, 73%, 85%, 1) 50%, hsla(211, 58%, 79%, 1) 100%)",
        }}
      >
        Add A Review
      </h3>
      <AddReview />
    </div>
  );
};

export default Review;
