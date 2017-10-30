CREATE TABLE public.product
(
   id serial NOT NULL,
   name text NOT NULL,
   price money NOT NULL,
   description text,
   category text,
   PRIMARY KEY (id)
)
WITH (
   OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.product
   OWNER to sa;