import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../APIs/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
import { Header } from "./Header";
import AddRestaurants from "./AddRestaurants";

const Admin = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [search, setSearch] = useState("");
  let history = useHistory();

  const handleSearch = async (id, e) => {
    e.preventDefault();
    try {
      if (search) {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
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
      console.log(err.message);
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

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return (
        <span className="text" style={{ color: "#ffb734" }}>
          0 reviews
        </span>
      );
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <React.Fragment>
      <div style={{ paddingTop: "10px" }}>
        <h3
          className="card"
          style={{
            marginTop: "20px",
            marginRight: "900px",
            padding: "10px 10px 10px 10px",
            textAlign: "Center",
            borderRadius: "2rem",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 1)",
            transition: "0.3s",
            fontFamily: "Trebuchet MS",
          }}
        >
          Hello Admin!
        </h3>
      </div>
      <Header />
      <div
        className="justify-content-center "
        style={{
          paddingTop: "70px",
          marginRight: "100px",
          marginLeft: "120px",
          paddingBottom: "120px",
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
                placeholder="Enter ID"
                style={{
                  outlineWidth: "thin",
                  outlineColor: "black",
                  outlineStyle: "solid",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                  transition: "0.3s",
                }}
              />
            </div>

            <button
              onClick={(e) => handleSearch(search, e)}
              className="btn   rounded"
              style={{
                backgroundColor: "#AA3A3A",
                background: "hsla(232, 73%, 65%, 1)",
                background:
                  "linear-gradient(90deg, hsla(232, 73%, 65%, 1) 0%, hsla(279, 33%, 48%, 1) 100%)",
                color: "White",
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div
        className="card"
        style={{
          margin: "0px 900px 20px 0px",
          padding: "7px 0px 7px 5px",
          boxShadow: "rgb(0, 0, 0) 0px 4px 8px 0px",
          transition: "0.3s",
          textAlign: "center",
          fontFamily: "Franklin Gothic Medium",
          fontSize: "20px",
          backgroundColor: "#FDA65D",
          borderRadius: "0rem 1rem 1rem 0rem",
        }}
      >
        Add A Restaurant
      </div>
      <div style={{ paddingBottom: "50px" }}>
        <AddRestaurants />
      </div>
      <div style={{ paddingBottom: "50px" }}>
        <div
          className="card"
          style={{
            marginBottom: "50px",

            boxShadow: "rgb(0, 0, 0) 0px 4px 8px 0px",
            transition: "0.3s",
          }}
        >
          <table className="table table-striped table-hover align-middle table-bordered">
            <thead
              style={{
                borderBottom: "2px solid #060709",
                border: "1px solid #c2cdd9",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <tr
                className="bg-primary "
                style={{
                  background: "hsla(210, 90%, 80%, 1)",

                  background:
                    "linear-gradient(90deg, hsla(210, 90%, 80%, 1) 0%, hsla(212, 93%, 49%, 1) 100%)",
                }}
              >
                <th
                  scope="col card"
                  className="text-center"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  Restaurant
                </th>
                <th
                  scope="col"
                  className="text-center "
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="text-center "
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  Price_Range(&lt;)
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  Reviews
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                    transition: "0.3s",
                  }}
                >
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {restaurants &&
                restaurants.map((restaurant) => {
                  return (
                    <tr key={restaurant.id}>
                      <td className="text-center">{restaurant.id}</td>
                      <td className="text-center">{restaurant.name}</td>
                      <td className="text-center">{restaurant.location}</td>
                      <td className="text-center">{restaurant.price_range}</td>
                      <td className="text-center">
                        {renderRating(restaurant)}
                      </td>
                      <td className="text-center">
                        <div
                          onClick={(e) => handleUpdate(restaurant.id, e)}
                          className="btn btn-warning"
                          style={{
                            background: "hsla(33, 100%, 53%, 1)",

                            background:
                              "linear-gradient(90deg, hsla(33, 100%, 53%, 1) 0%, hsla(58, 100%, 68%, 1) 100%)",
                          }}
                        >
                          Edit
                        </div>
                      </td>
                      <td className="text-center">
                        <div
                          onClick={(e) => handleDelete(restaurant.id, e)}
                          className="btn btn-danger"
                          style={{
                            background: "hsla(350, 93%, 61%, 1)",
                            background:
                              "linear-gradient(90deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
                          }}
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
    </React.Fragment>
  );
};

export default Admin;
