DROP TABLE IF EXISTS stocks;
CREATE TABLE stocks(id serial PRIMARY KEY, isin VARCHAR(255), user_id BIGINT);


INSERT INTO stocks(id, isin, user_id) VALUES(1, 'hallo', 9150434);
INSERT INTO stocks(id, isin, user_id) VALUES(2, 'halloviuv', 9150434);
INSERT INTO stocks(id, isin, user_id) VALUES(3, 'halloviuv', 9150434);