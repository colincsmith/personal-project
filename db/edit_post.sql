UPDATE posts
SET 
content = $2
WHERE
post_id = $1;

SELECT * FROM posts;