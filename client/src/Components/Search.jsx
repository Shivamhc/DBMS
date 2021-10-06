import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import StarRating from "./StarRating";

export const Search = (props) => {
  //const { id } = useParams();
  let history = useHistory();
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  var isSubmit = false;
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
        // isSubmit = true;
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
      </>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("response");
        const response = await RestaurantFinder.get(`/restaurants`);
        //console.log(response);

        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div
      className="justify-content-center "
      style={{
        paddingTop: "180px",
        marginRight: "100px",
        marginLeft: "120px",
        paddingBottom: "180px",
      }}
    >
      <form action="">
        <div className="form-row ">
          <div className="col">
            <input
              value={search}
              onChange={handleChange}
              type="search"
              className="form-control"
              placeholder="Search"
            />
          </div>

          <button
            onClick={handleSearch}
            className="btn btn-danger  rounded"
            //sytle={{ color: "white" }}
          >
            Search
          </button>
        </div>
      </form>
      <div className=" row row-cols-2" style={{ paddingTop: "100px" }}>
        {restaurants &&
          restaurants.map((restaurant) => {
            return (
              <div
                key={restaurant.id}
                className="mr-auto"
                style={{
                  backgroundColor: "#f5f4db",
                  marginBottom: "50px",
                  paddingLeft: "2px",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
                  transition: "0.3s",
                  //maxWidth: "50%",
                }}
              >
                <div className="card ">
                  <h4 className="card-header">{restaurant.name}</h4>
                  <div className="card-body">
                    <h6 className="card-title">
                      <strong>Location:</strong> {restaurant.location}
                    </h6>
                    <h6 className="card-title">
                      <strong>Price Range(Less Than)</strong> :
                      {restaurant.price_range}
                    </h6>
                    <h6 className="card-title">
                      <strong>Ratings: </strong> :{renderRating(restaurant)}
                    </h6>

                    <button
                      onClick={() => handleRestaurantSelect(restaurant.id)}
                      className="btn btn-success"
                    >
                      View Comments
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* <div className="list-group">
        <table className="table table-hover align-middle">
          <thead>
            { (
              <tr className="bg-primary">
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price_Range(&lt;)</th>
                <th scope="col">Reviews</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            )}
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
      </div> */}
    </div>
  );
};
