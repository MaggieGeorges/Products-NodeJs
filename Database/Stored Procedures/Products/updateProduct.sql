USE Ecommerce;
GO

CREATE OR ALTER PROCEDURE updateProduct
    @id VARCHAR,
    @name VARCHAR(255),
    @price DECIMAL(18, 2),
    @categoryId VARCHAR
AS
BEGIN
    UPDATE products
    SET name = @name, price = @price, categoryId=@categoryId
    WHERE id = @id;
END
GO
