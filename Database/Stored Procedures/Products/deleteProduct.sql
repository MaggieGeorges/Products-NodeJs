USE Ecommerce;
GO

CREATE OR ALTER PROCEDURE deleteProduct
    @id VARCHAR
AS
BEGIN
    DELETE FROM products WHERE id = @id;
END
GO
