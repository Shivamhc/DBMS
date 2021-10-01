import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import Reviews from "../Components/Reviews";
import StarRating from "../Components/StarRating";
import AddReview from "../Components/AddReview";
import { RestaurantsContext } from "../Context/RestaurantContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
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

  return (
    <div>
      {selectedRestaurants && (
        <React.Fragment>
          <h1 className="text-center display-1">
            {selectedRestaurants.restaurant.name}
          </h1>
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
          <div className="mt-3">
            <Reviews reviews={selectedRestaurants.reviews} />
          </div>
          <AddReview />
        </React.Fragment>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
