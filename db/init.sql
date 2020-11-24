CREATE TABLE users 
(
user_id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE posts 
(
post_id SERIAL PRIMARY KEY,
img TEXT, 
resort_name VARCHAR(100),
location TEXT,
user_id INT REFERENCES users(user_id)
);

CREATE TABLE comments 
(
comment_id SERIAL PRIMARY KEY,
body TEXT,
user_id INT REFERENCES users(user_id),
post_id INT REFERENCES posts(post_id)
);