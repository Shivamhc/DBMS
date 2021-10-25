import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import StarRating from "./StarRating";

export const Search = (props) => {
  let history = useHistory();
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (search) {
        const response = await RestaurantFinder.get(
          `/searchRestaurant/?location=${search}`
        );
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

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return (
        <span className="text" style={{ color: "#FF9300" }}>
          0 reviews
        </span>
      );
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
      </>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("response");
        const response = await RestaurantFinder.get(`/restaurants`);
        console.log(response.data.data.restaurants);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <div
      className="justify-content-center "
      style={{
        paddingTop: "120px",
        marginRight: "100px",
        marginLeft: "120px",
        paddingBottom: "180px",
      }}
    >
      <form action="" style={{}}>
        <div className="form-row ">
          <div className="col">
            <input
              value={search}
              onChange={handleChange}
              type="search"
              className="form-control card"
              placeholder="Search"
              style={{
                outlineWidth: "thin",
                outlineColor: "black",
                outlineStyle: "solid",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)",
                transition: "0.3s",
              }}
            />
          </div>

          <button
            onClick={handleSearch}
            className="btn btn-danger  rounded"
            style={{
              backgroundColor: "#AA3A3A",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.8)",
              transition: "0.3s",
            }}
          >
            Search
          </button>
          {name}
        </div>
      </form>
      <div className=" row row-cols-2" style={{ paddingTop: "150px" }}>
        {restaurants &&
          restaurants.map((restaurant) => {
            return (
              <div
                key={restaurant.id}
                className="mr-auto"
                style={{
                  marginBottom: "50px",
                  paddingLeft: "2px",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                  transition: "0.3s",
                }}
              >
                <div
                  className="card-header text-white"
                  style={{
                    background: "hsla(145, 84%, 15%, 1)",
                    background:
                      "linear-gradient(135deg, hsla(145, 84%, 15%, 1) 0%, hsla(161, 46%, 49%, 1) 100%)",
                  }}
                >
                  <h5> {restaurant.name}</h5>
                </div>
                <div className="card-body" style={{ backgroundColor: "white" }}>
                  <h6 className="card-title">
                    <strong>Location:</strong> {restaurant.location}
                  </h6>
                  <h6 className="card-title">
                    <strong>Price Range(Less Than)</strong> :
                    {restaurant.price_range}
                  </h6>
                  <h6 className="card-title">
                    <strong>Ratings: </strong> {renderRating(restaurant)}
                  </h6>

                  <button
                    onClick={() => handleRestaurantSelect(restaurant.id)}
                    className="btn btn-success"
                  >
                    View Reviews
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
