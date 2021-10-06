import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import Reviews from "../Components/Reviews";
import StarRating from "../Components/StarRating";
import AddReview from "../Components/AddReview";
import { RestaurantsContext } from "../Context/RestaurantContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  let history = useHistory();
  const { selectedRestaurants, setSelectedRestaurants } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        //console.log(response.data.data.restaurant);
        setSelectedRestaurants(response.data.data); // For storing both restuarants and reviews data
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleNewReview = (id) => {
    history.push(`/restaurants/${id}/AddReview`);
  };
  return (
    <div>
      {selectedRestaurants && (
        <React.Fragment>
          <h2
            className="text-center display-1"
            style={{
              backgroundColor: "#f4f3cc",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
              transition: "0.3s",
            }}
          >
            {selectedRestaurants.restaurant.name}
          </h2>
          <br />
          <div className="text-center">
            <StarRating
              rating={selectedRestaurants.restaurant.average_rating}
            />

            <span className="text-warning ml-1">
              {selectedRestaurants.restaurant.count
                ? `(${selectedRestaurants.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <br />
          <div className="mt-3">
            <Reviews reviews={selectedRestaurants.reviews} />
          </div>
          <div className=" text-center mb-5">
            <button
              id="singlebutton"
              name="singlebutton"
              class="btn btn-primary"
              onClick={() => handleNewReview(id)}
            >
              Add Review
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
