USE MyProducts;
GO

CREATE OR ALTER PROCEDURE filterProducts
    @MinPrice DECIMAL(10, 2),
    @MaxPrice DECIMAL(10, 2),
    @ProductName VARCHAR(255)
AS
BEGIN
    SELECT * FROM products
    WHERE price BETWEEN @MinPrice AND @MaxPrice
    AND name = @ProductName;
END
GO
