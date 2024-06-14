USE MyProducts;
GO

CREATE OR ALTER PROCEDURE getCategoriesWithProducts
AS
BEGIN
    SELECT c.*, p.*
    FROM categories c
    LEFT JOIN products p ON c.id = p.categoryId;
END
GO
