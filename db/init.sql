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
ski_name VARCHAR(100),
content VARCHAR(400),
user_id INT REFERENCES users(user_id)
);

CREATE TABLE comments 
(
comment_id SERIAL PRIMARY KEY,
body TEXT,
user_id INT REFERENCES users(user_id),
post_id INT REFERENCES posts(post_id)
);

CREATE TABLE email
(
email_id SERIAL PRIMARY KEY,
email_input VARCHAR(100)
);