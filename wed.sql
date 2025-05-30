CREATE DATABASE event_app;

USE event_app;

CREATE TABLE users(
    id INT AUT0_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    qr_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);