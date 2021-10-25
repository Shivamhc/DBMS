import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantContext";

export const Update = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setName(response.data.data.restaurants[0].name);
        setLocation(response.data.data.restaurants[0].location);
        setPriceRange(response.data.data.restaurants[0].price_range);
        console.log(response.data.data);
      };
      fetchData();
    } catch (err) {}
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/restaurants/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push("/admin");
  };

  return (
    <div style={{ paddingBottom: "200px" }}>
      <div
        class="card"
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
          <div
            className="form-group"
            style={{
              padding: "20px 30px 5px 30px",
            }}
          >
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="form-control"
              type="text"
            />
          </div>
          <div
            className="form-group"
            style={{
              padding: "5px 30px 5px 30px",
            }}
          >
            <label htmlFor="location">
              <strong>Location</strong>
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              id="location"
              className="form-control"
              type="text"
            />
          </div>
          <div
            className="form-group"
            style={{
              padding: "5px 30px 5px 30px",
            }}
          >
            <label htmlFor="price_range">
              <strong>Price Range</strong>
            </label>
            <input
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              id="price_range"
              className="form-control"
              type="text"
              style={{}}
            />
          </div>
          <button
            style={{
              margin: "5px 30px 15px 30px",
              background: "hsla(33, 100%, 53%, 1)",
              background:
                "linear-gradient(135deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)",
            }}
            onClick={handleSubmit}
            className="btn btn-warning"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};
