import React, { useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import RestaurantFinder from "../APIs/RestaurantFinder";
import Reviews from "../Components/Reviews";
import StarRating from "../Components/StarRating";
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
        setSelectedRestaurants(response.data.data);
        console.log(response.data.data);
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
    <div style={{ paddingTop: "20px" }}>
      {selectedRestaurants && (
        <React.Fragment>
          <h2
            className="text-center display-1"
            style={{
              marginTop: "30px",
              marginBottom: "50px",
              paddingBottom: "15px",
              backgroundColor: "#C6D57E",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
              transition: "0.3s",
              fontFamily: "Futara",
              background: "hsla(70, 51%, 66%, 1)",
              background:
                "linear-gradient(135deg, hsla(70, 51%, 66%, 1) 0%, hsla(101, 62%, 48%, 1) 100%)",
            }}
          >
            {selectedRestaurants.restaurants[0].name}
          </h2>
          <br />
          <div
            className="text-center card "
            style={{
              marginRight: "440px",
              paddingTop: "5px",
              paddingBottom: "5px",
              backgroundColor: "#F9F5E0",
              marginLeft: "440px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
              transition: "0.3s",
              borderRadius: "1rem",
            }}
          >
            <h3>
              <StarRating
                rating={selectedRestaurants.restaurants[0].average_rating}
              />
              <span className="text-warning ml-1">
                {selectedRestaurants.restaurants[0].count
                  ? `(${selectedRestaurants.restaurants[0].count})`
                  : "(0)"}
              </span>
            </h3>
          </div>
          <br />
          <div className="mt-3">
            <Reviews reviews={selectedRestaurants.reviews} />
          </div>
          <div
            className=" text-center "
            style={{
              marginTop: "50px",
              paddingBottom: "200px",
            }}
          >
            <button
              id="singlebutton"
              name="singlebutton"
              className="btn "
              style={{
                background: "hsla(159, 35%, 45%, 1)",

                background:
                  "linear-gradient(135deg, hsla(159, 35%, 45%, 1) 0%, hsla(176, 68%, 12%, 1) 100%)",
                color: "White",
              }}
              onClick={() =>
                handleNewReview(selectedRestaurants.restaurants[0].name)
              }
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
