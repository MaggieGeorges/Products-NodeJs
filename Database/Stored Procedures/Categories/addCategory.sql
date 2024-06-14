USE MyProducts;
GO

CREATE OR ALTER PROCEDURE addCategory
    @Id INT,
    @Name VARCHAR(255)
AS
BEGIN
    INSERT INTO categories (id, name)
    VALUES (@Id, @Name);
END
GO