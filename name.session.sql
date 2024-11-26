INSERT INTO rezeptnames (id, rezeptname, youtube_link, chefkoch_link)
VALUES (
    'id:varchar',
    'rezeptname:json',
    'youtube_link:text',
    'chefkoch_link:text'
  );SELECT JSON_TYPE(ids) FROM zutaten;
