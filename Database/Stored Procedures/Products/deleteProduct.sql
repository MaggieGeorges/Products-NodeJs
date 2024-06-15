USE MyProducts;
GO

CREATE OR ALTER PROCEDURE deleteProduct
    @id VARCHAR(255)
AS
BEGIN
    DELETE FROM products WHERE id = @id;
END
GO
