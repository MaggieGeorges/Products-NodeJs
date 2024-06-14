USE Ecommerce;
GO

CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    categoryId VARCHAR(255),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);
