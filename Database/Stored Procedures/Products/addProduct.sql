USE Ecommerce
GO

CREATE OR ALTER PROCEDURE addProduct
    @id VARCHAR(255),
    @name VARCHAR(255),
    @price DECIMAL(18,2),
    @categoryId VARCHAR(255)
AS
BEGIN
    INSERT INTO products (id, name, price, categoryId)
    VALUES (@id, @name, @price, @categoryId);
END
GO


SELECT * FROM products;