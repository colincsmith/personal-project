UPDATE puns
SET 
ski_name = $2,
content = $3
WHERE
pun_id = $1;

SELECT * FROM puns;