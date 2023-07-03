CREATE TABLE z_customer (
    id    INTEGER NOT NULL,
    zip   INTEGER,
    city  VARCHAR2(50 CHAR),
    state VARCHAR2(10 CHAR)
);

ALTER TABLE z_customer ADD CONSTRAINT z_customer_pk PRIMARY KEY ( id );

CREATE TABLE z_date (
    id      INTEGER NOT NULL,
    "DATE"  DATE,
    day     VARCHAR2(50 CHAR),
    month   VARCHAR2(50 CHAR),
    quarter VARCHAR2(50 CHAR),
    year    INTEGER
);

ALTER TABLE z_date ADD CONSTRAINT z_date_pk PRIMARY KEY ( id );

CREATE TABLE z_fact (
    id            INTEGER NOT NULL,
    price         NUMBER(10, 4),
    z_customer_id INTEGER NOT NULL,
    z_date_id     INTEGER NOT NULL,
    z_product_id  INTEGER NOT NULL
);

ALTER TABLE z_fact ADD CONSTRAINT z_fact_pk PRIMARY KEY ( id );

CREATE TABLE z_product (
    id       INTEGER NOT NULL,
    name     VARCHAR2(50 CHAR),
    category VARCHAR2(50 CHAR)
);

ALTER TABLE z_product ADD CONSTRAINT z_product_pk PRIMARY KEY ( id );

ALTER TABLE z_fact
    ADD CONSTRAINT z_fact_z_customer_fk FOREIGN KEY ( z_customer_id )
        REFERENCES z_customer ( id );

ALTER TABLE z_fact
    ADD CONSTRAINT z_fact_z_date_fk FOREIGN KEY ( z_date_id )
        REFERENCES z_date ( id );

ALTER TABLE z_fact
    ADD CONSTRAINT z_fact_z_product_fk FOREIGN KEY ( z_product_id )
        REFERENCES z_product ( id );