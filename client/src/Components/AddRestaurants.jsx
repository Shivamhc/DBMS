import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantContext";

const AddRestaurants = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/restaurants", {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data.restaurant);
      history.push("/");
      history.push("/admin");
      console.log(response);
    } catch (err) {}
  };

  return (
    <div
      className="card"
      style={{
        padding: "10px 10px 10px 10px",
        background: "hsla(139, 70%, 75%, 1)",
        outlineWidth: "thin",
        outlineColor: "black",
        outlineStyle: "solid",
        background: "hsla(139, 70%, 75%, 1)",
        background:
          "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
      }}
    >
      <div className="md-4 ">
        <form action="">
          <div className="form-row">
            <div className="col">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Restaurant's Name"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.36) 0px 4px 8px 0px",
                  transition: "0.3s",
                  outlineWidth: "thin",
                  outlineColor: "black",
                  outlineStyle: "solid",
                }}
              />
            </div>
            <div className="col">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
                type="text"
                placeholder="Location"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.36) 0px 4px 8px 0px",
                  transition: "0.3s",
                  outlineWidth: "thin",
                  outlineColor: "black",
                  outlineStyle: "solid",
                }}
              />
            </div>
            <div className="col">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="custom-select  mr-sm-2"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.36) 0px 4px 8px 0px",
                  transition: "0.3s",
                  marginRight: "20px",
                  outlineWidth: "thin",
                  outlineColor: "black",
                  outlineStyle: "solid",
                }}
              >
                <option disabled>Price Range</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                <option value="3000">3000</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="100000">100000</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.36) 0px 4px 8px 0px",
                transition: "0.3s",
                background: "hsla(97, 56%, 42%, 1)",
                background:
                  "linear-gradient(90deg, hsla(97, 56%, 42%, 1) 0%, hsla(92, 55%, 62%, 1) 100%)",
                color: "Black",
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurants;
