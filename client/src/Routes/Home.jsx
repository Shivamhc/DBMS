import React from "react";
import AddRestaurants from "../Components/AddRestaurants";
import { Header } from "../Components/Header";
import RestaurantsList from "../Components/RestaurantsList";
import { Search } from "../Components/Search";

export const Home = () => {
  return (
    <div>
      <Header />
      {/* <AddRestaurants /> */}
      <Search />
      {/* <RestaurantsList /> */}
    </div>
  );
};
