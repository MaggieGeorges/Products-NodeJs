USE MyProducts;
GO

CREATE OR ALTER PROCEDURE updateProduct
    @id VARCHAR(255),
    @name VARCHAR(255),
    @price DECIMAL(18, 2)
AS
BEGIN
    UPDATE products
    SET name = @name, price = @price
    WHERE id = @id;
END
GO
