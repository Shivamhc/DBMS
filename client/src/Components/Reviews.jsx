import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2 ml-4">
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="card text-dark outline-dark mb-3 mr-4"
            style={{
              maxWidth: "30%",
              paddingLeft: "2px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
              transition: "0.3s",
            }}
          >
            <div
              className="card-header text-white d-flex justify-content-between"
              style={{
                backgroundColor: "#005A8D",
                background: "hsla(236, 100%, 8%, 1)",
                background:
                  "linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)",
              }}
            >
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
