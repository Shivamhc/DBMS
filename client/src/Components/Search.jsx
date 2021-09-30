import React, { useState, useEffect } from "react";
import {} from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantContext";

export const Search = (props) => {
  const [restaurant, setRestaurant] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/searchRestaurant`);
        console.log(response.data.data);
      };
      fetchData();
    } catch (err) {}
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (search) {
        const response = await RestaurantFinder.get(
          `/searchRestaurant/?location=${search}`
        );
        console.log(response.data.data);
        setSearch("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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
        <button onClick={handleSubmit} className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};
