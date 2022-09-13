

/*Add review to  database */

DROP TABLE IF EXISTS songReview
CREATE TABLE IF NOT EXISTS songReview(
  id SERIAL PRIMARY KEY,      
  song VARCHAR(30) NOT NULL,   
  review VARCHAR(50),             
review_date date   
);


INSERT INTO songReview(song, review, review_dates)
VALUES('paradise', 'good', '2021-12-05T07:00:00Z'),
VALUES('paradise', 'test', '2021-12-05T07:30:00Z'),
VALUES('paradise', 'bad', '2021-12-05T08:00:00Z');



