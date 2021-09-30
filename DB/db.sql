--CREATING DATABASE

CREATE DATABASE RESTAURANT_FINDER;

--CREATING TABLE
CREATE TABLE restaurants (
    id BIGSERIAL PRIMARY KEY,  --BIGSERIAL increments id by 1;
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK (price_range>=100 and price_range<=100000)
);

--INSERTING VALUES INTO RESTAURANT TABLE
INSERT INTO restaurants(name,location,price_range) VALUES('Khalsa', 'Sector-1', 1000);


