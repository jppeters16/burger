CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers(
    id INT AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(75),
    -- set boolean to default and 0 so starting value is false
    devoured BOOLEAN DEFAULT 0 NOT NULL,
    PRIMARY KEY (id)
);