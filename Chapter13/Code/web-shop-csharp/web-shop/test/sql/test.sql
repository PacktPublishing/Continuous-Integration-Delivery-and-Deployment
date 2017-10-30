\set QUIET 1
-- Turn off echo and keep things quiet.

-- Format the output for nice TAP.
\pset format unaligned
\pset tuples_only true
\pset pager

-- Revert all changes on failure.
\set ON_ERROR_ROLLBACK 1
\set ON_ERROR_STOP true
\set QUIET 1

BEGIN;
	SELECT plan(4);
    
    SELECT has_table('shopping_cart');
    SELECT has_column('shopping_cart', 'number');
    SELECT col_type_is('shopping_cart', 'number', 'integer');
    
    DO $$
    BEGIN
        PERFORM add_product_to_cart('test_username', 1);
        PERFORM add_product_to_cart('test_username', 1);
        PERFORM add_product_to_cart('test_username', 2);
    END $$;
    
    SELECT results_eq(
        'SELECT user_id, product_id, number FROM shopping_cart WHERE user_id = 1',
        $$VALUES ( 1, 1, 2 ), ( 1, 2, 1 )$$,
        'The products should be inserted into the shopping cart.'
    );
        
	-- Finish the tests and clean up.
	SELECT * FROM finish();
    ROLLBACK;
END