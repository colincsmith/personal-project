SELECT p.img, p.ski_name, p.content, u.user_id
FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE p.post_id = $1;