CREATE OR REPLACE FUNCTION add_product_to_cart
(
    p_username TEXT,
    p_product_id INT
)
RETURNS void AS $$
	DECLARE v_user_id INT;
BEGIN
	v_user_id := (SELECT id FROM public.user WHERE username = p_username);
	IF EXISTS(SELECT * FROM shopping_cart
                WHERE user_id = v_user_id
              	  AND product_id = p_product_id) THEN
    	UPDATE shopping_cart
           SET number = number + 1
         WHERE user_id = v_user_id
           AND product_id = p_product_id;
    ELSE
    	INSERT INTO shopping_cart
        (
        	user_id,
            product_id,
            number
        )
        VALUES
        (
            v_user_id,
            p_product_id,
            1
        );
    END IF;
END;
$$ LANGUAGE plpgsql;