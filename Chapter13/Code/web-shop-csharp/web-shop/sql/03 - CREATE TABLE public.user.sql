CREATE TABLE public."user"
(
   id serial NOT NULL,
   username text NOT NULL,
   password text,
   PRIMARY KEY (id)
)
WITH (
   OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."user"
   OWNER to sa;