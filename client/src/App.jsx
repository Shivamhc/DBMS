import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Review from "./Routes/Review";
import { RestaurantsContextProvider } from "./Context/RestaurantContext";
import { Home } from "./Routes/Home";
import RestaurantDetailPage from "./Routes/RestaurantDetailPage";
import { UpdateRestaurants } from "./Routes/UpdateRestaurants";
import Admin from "./Components/Admin";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/restaurants/:id/update"
            component={UpdateRestaurants}
          />
          <Route
            exact
            path="/restaurants/:id"
            component={RestaurantDetailPage}
          />
          <Route exact path="/restaurants/:id/AddReview" component={Review} />
          <Route exact path="/admin" component={Admin} />
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
