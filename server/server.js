require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./DB");
const router = require("express").Router();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//CREATING APIs

//GET ALL RESTAURANTS

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingsData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//GET A RESTAURANT AND GET A RESTUARANT REVIEW
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
      [req.params.id]
    );
    const reviews = await db.query(
      `select * from reviews where restaurant_id=$1`,
      [req.params.id]
    );
    console.log(restaurant.rows);
    res.status(200).json({
      status: "success",
      data: {
        restaurants: restaurant.rows,
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//GET A RESTAURANT USING LOCATION
app.get("/api/v1/searchRestaurant", async (req, res) => {
  try {
    const results = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id  where location LIKE INITCAP($1)",
      ["%" + req.query.location + "%"]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//CREATE A RESTAURANT
app.post("/api/v1/restaurants", async (req, res) => {
  console.log("Creating a restaurant");
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//UPDATE RESTAURANTS

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name=$1,location=$2,price_range=$3 where id=$4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//DELETE RESTAURANT

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM restaurants where id=$1", [
      req.params.id,
    ]);
    console.log("Deleting a restaurant");
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log("hello");
    console.log(err.message);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
