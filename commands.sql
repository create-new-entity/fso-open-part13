
CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs(author, url, title, likes)
VALUES('Phil Hornshaw', 'https://blog.playstation.com/2025/10/16/battlefield-6-9-ways-it-evolves-the-franchises-formula/', 'Battlefield 6 — 9 ways it evolves the franchise’s formula', 2);

INSERT INTO blogs(author, url, title, likes)
VALUES('Dong-won Lee', 'https://blog.playstation.com/2025/09/24/crimson-desert-launches-march-19-new-story-trailer-revealed/', 'Crimson Desert launches March 19, new story trailer revealed', 4);