USE MyProducts;
GO

CREATE OR ALTER PROCEDURE addProduct
    @id VARCHAR(255),
    @name VARCHAR(255),
    @price DECIMAL(18,2)
AS
BEGIN
    INSERT INTO products (id, name, price)
    VALUES (@id, @name, @price);
END
GO


SELECT * FROM products;