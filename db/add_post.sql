INSERT INTO posts(img, ski_name, content, user_id)
VALUES($1, $2, $3, $4)
RETURNING *;