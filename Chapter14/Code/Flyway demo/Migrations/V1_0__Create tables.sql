CREATE TABLE public.some_table
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT some_table_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.some_table
    OWNER to sa;