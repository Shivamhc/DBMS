import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantsList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  let history = useHistory();

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/restaurants/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id, e) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/restaurants");
        //console.log(response);

        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover align-middle">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price_Range(&lt;)</th>
            <th scope="col">Reviews</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  key={restaurant.id}
                  //onClick={() => handleRestaurantSelect(restuarant.id)}
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{restaurant.price_range}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <div
                      onClick={(e) => handleUpdate(restaurant.id, e)}
                      className="btn btn-warning"
                    >
                      Edit
                    </div>
                  </td>
                  <td>
                    <div
                      onClick={(e) => handleDelete(restaurant.id, e)}
                      className="btn btn-danger"
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
