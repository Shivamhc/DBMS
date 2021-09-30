import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RestaurantsContextProvider } from "./Context/RestaurantContext";
import { Home } from "./Routes/Home";

import { UpdateRestaurants } from "./Routes/UpdateRestaurants";

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
          {/* <Route exact path="/restaurants/:id" component={UpdateRestaurants} /> */}
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
