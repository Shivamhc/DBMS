import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantContext";

export const Search = (props) => {
  //const { id } = useParams();
  let history = useHistory();
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  //const [selectedRestaurant, setselectedRestaurant] = useState(null);

  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       //e.preventDefault();
  //       const response = await RestaurantFinder.get(
  //         `/searchRestaurant/?location=${search}`
  //       );

  //       console.log("hello");
  //       console.log(response.data.data);
  //       setRestaurants(response.data.data.restaurants);
  //       console.log("hello");
  //     };
  //     fetchData();
  //   } catch (err) {}
  // }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (search) {
        const response = await RestaurantFinder.get(
          `/searchRestaurant/?location=${search}`
        );
        console.log("hello1");
        console.log(response.data.data.restaurants);

        setRestaurants(response.data.data.restaurants);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdate = (id) => {
    history.push(`/restaurants/${id}/update`);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("response");
  //       const response = await RestaurantFinder.get(`/restaurants`);
  //       //console.log(response);

  //       setRestaurants(response.data.data.restaurants);
  //     } catch (err) {}
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={search}
              onChange={handleChange}
              type="search"
              className="form-control"
              placeholder="Search"
            />
          </div>
        </div>
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </form>

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
                  <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{restaurant.price_range}</td>
                    <td>reviews</td>
                    <td>
                      <div
                        onClick={() => handleUpdate(restaurant.id)}
                        className="btn btn-warning"
                      >
                        Edit
                      </div>
                    </td>
                    <td>
                      <div
                        // onClick={() => handleDelete(restaurant.id)}
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
    </div>
  );
};
