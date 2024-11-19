SELECT 
    z.id AS rezept_id, 
    r.rezeptname, 
    z.ids,
    r.youtube_link,
    r.chefkoch_link
FROM zutaten z
JOIN rezeptnames r ON z.id = r.id;


