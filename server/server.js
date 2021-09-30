require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./DB");

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//CREATING APIs

//GET ALL RESTAURANTS
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    // console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
    //console.log("Get all restaurants");
  } catch (err) {
    console.log(err);
  }
});

//GET A RESTAURANT
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const results = await db.query(`select * from restaurants where id=$1`, [
      req.params.id,
    ]);
    //console.log(results.rows[0]);
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

//GET A RESTAURANT USING LOCATION
app.get("/api/v1/searchRestaurant", async (req, res) => {
  try {
    //console.log("You are dead");
    //console.log(req.query.location);
    const results = await db.query(
      "SELECT * FROM restaurants WHERE location LIKE INITCAP($1)",
      ["%" + req.query.location + "%"]
    );
    //console.log(results.rows);
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
    //console.log(results);
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
    // console.log(results);

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
    //console.log("Deleting a restaurant");
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
