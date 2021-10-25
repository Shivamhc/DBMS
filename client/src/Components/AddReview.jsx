import React, { useState } from "react";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { useLocation, useParams, useHistory } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(
        `restaurants/${id}/addReview`,
        {
          name,
          review: reviewText,
          rating,
        }
      );

      history.push(location.pathname);
      history.push(`/restaurants/${id}`);
    } catch (err) {}
  };

  return (
    <div style={{ paddingBottom: "200px" }}>
      <div
        className="card"
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.8)",
          transition: "0.3s",
          marginTop: "90px",
          marginRight: "90px",
          marginLeft: "90px",
        }}
      >
        <form action="">
          <div className="form-row">
            <div
              className="form-group col-8"
              style={{
                padding: "20px 30px 5px 30px",
              }}
            >
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="name"
                type="text"
                className="form-control"
              />
            </div>
            <div
              className="form-group col-4"
              style={{
                padding: "20px 30px 5px 30px",
              }}
            >
              <label htmlFor="rating">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                id="rating"
                className="custom-select"
              >
                <option disabled>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div
            className="form-group"
            style={{
              padding: "20px 30px 5px 30px",
            }}
          >
            <label htmlFor="Review">Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              id="Review"
              className="form-control"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={handleSubmitReview}
            className="btn btn-primary"
            style={{
              margin: "5px 30px 15px 30px",
              backgroundColor: "#2B4584",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddReview;
