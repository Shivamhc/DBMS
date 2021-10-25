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

--CREATING TABLE REVIEWS
CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id  BIGSERIAL NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating>=1 and rating <=5)
);

alter table reviews add constraint reviews_restaurant_id_fkey foreign key (restaurant_id) references restaurants(id) on delete cascade on update cascade;


