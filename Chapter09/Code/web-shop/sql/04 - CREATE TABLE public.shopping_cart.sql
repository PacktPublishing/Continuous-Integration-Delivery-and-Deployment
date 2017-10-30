CREATE TABLE public.shopping_cart
(
   id bigserial NOT NULL,
   user_id integer NOT NULL,
   product_id integer NOT NULL,
   "number" integer NOT NULL DEFAULT 1;
   PRIMARY KEY (id),
   CONSTRAINT fk_shopping_cart_user FOREIGN KEY (user_id)
      REFERENCES public."user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION,
   CONSTRAINT fk_shopping_cart_product FOREIGN KEY (product_id)
      REFERENCES public.product (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
)
WITH (
   OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.shopping_cart
   OWNER to sa;