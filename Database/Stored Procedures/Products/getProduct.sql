USE MyProducts;
GO

CREATE OR ALTER PROCEDURE getProduct
    @id VARCHAR
AS
BEGIN
    SELECT * FROM products WHERE id = @id;
END
GO
