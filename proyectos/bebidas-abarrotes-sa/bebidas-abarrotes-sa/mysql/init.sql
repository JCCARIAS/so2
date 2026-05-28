

CREATE DATABASE IF NOT EXISTS empresa;

USE empresa;

-- =========================================
-- TABLA USUARIOS
-- =========================================

CREATE TABLE usuarios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario VARCHAR(100),

    password VARCHAR(100),

    rol VARCHAR(50)

);

INSERT INTO usuarios (
    usuario,
    password,
    rol
)

VALUES

('admin', '1234', 'admin'),
('ventas1', '1234', 'ventas'),
('inventario1', '1234', 'inventario'),
('finanzas1', '1234', 'finanzas');

-- =========================================
-- CLIENTES
-- =========================================

CREATE TABLE clientes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100),

    telefono VARCHAR(20),

    direccion VARCHAR(200)

);

INSERT INTO clientes (
    nombre,
    telefono,
    direccion
)

VALUES

('Juan Perez', '5555-1111', 'Guatemala'),
('Maria Lopez', '5555-2222', 'Mixco');

-- =========================================
-- PRODUCTOS
-- =========================================

CREATE TABLE productos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100),

    precio DECIMAL(10,2),

    stock INT

);

INSERT INTO productos (
    nombre,
    precio,
    stock
)

VALUES

('Coca Cola', 10.50, 100),
('Pepsi', 9.50, 150);

-- =========================================
-- VENTAS
-- =========================================

CREATE TABLE ventas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    producto VARCHAR(100),

    cantidad INT,

    total DECIMAL(10,2)

);

INSERT INTO ventas (
    producto,
    cantidad,
    total
)

VALUES

('Coca Cola', 5, 52.50),
('Pepsi', 3, 28.50);
