CREATE TABLE public.other_table
(
    id integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT other_table_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.other_table
    OWNER to sa;