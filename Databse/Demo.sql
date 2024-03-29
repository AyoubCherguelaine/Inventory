-- Inserting data into BaseArticle
INSERT INTO BaseArticle (Name) VALUES
    ('Article 1'),
    ('Article 2'),
    ('Article 3');

-- Inserting data into Dimension
INSERT INTO Dimension (description, Title) VALUES
    ('Small', 'Size S'),
    ('Medium', 'Size M'),
    ('Large', 'Size L');

-- Inserting data into Article
INSERT INTO Article (SalePrice, Cost, Reference, BarCode, idBaseArticle, idDimension) VALUES
    (100.00, 50.00, 'REF123', 'BC123', 1, 1),
    (150.00, 70.00, 'REF456', 'BC456', 2, 2),
    (200.00, 100.00, 'REF789', 'BC789', 3, 3);

-- Inserting data into Actor
INSERT INTO Actor (Name, Reference) VALUES
    ('Supplier A', 'SUPA123'),
    ('Supplier B', 'SUPB456'),
    ('Warehouse 1', 'WH1');

-- Inserting data into warehouse
INSERT INTO Warehouse (warehouseName, Reference) VALUES
    ('Warehouse A', 'WH-A'),
    ('Warehouse B', 'WH-B');

-- Inserting data into Article_in_warehouse
INSERT INTO Article_in_warehouse (idwarehouse, idArticle, Quantity, Lot) VALUES
    (1, 1, 50, 'Lot123'),
    (2, 1, 30, 'Lot456'),
    (1, 2, 20, 'Lot789');

-- Inserting data into TypeOperation
INSERT INTO TypeOperation (Title, favorite) VALUES
    ('Receipts', TRUE),
    ('Delivery Orders', TRUE);

-- Inserting data into Operation
INSERT INTO Operation (idType, idActor, idwarehouse, DateOp, Confirme) VALUES
    (1, 1, 2, NOW(), FALSE),
    (2, 3, 1, NOW(), FALSE);

-- Inserting data into LineOperation
INSERT INTO LineOperation (idArticle, idOperation, Quantity) VALUES
    (1, 1, 10),
    (2, 1, 5),
    (1, 2, 8);


select IsArticleQuantityAvailable(1,1,100);



SELECT * FROM RecentOperations;


SELECT * FROM ActorOperations;

SELECT * FROM ActorBoughtArticles;

select * from ArticleWarehouseDetails;

select * from ArticleInfo

select * from WarehouseOperations


drop VIEW `OperationDetails`;
-- View: OperationDetails


CREATE VIEW OperationInfo AS
SELECT
    o.idOperation,
    ot.idType,
    ot.Title AS OperationType,
    a.idActor,
    a.Name AS ActorName,
    w.idWarehouse,
    w.warehouseName,
    o.DateOp,
    o.Confirme
FROM Operation o
JOIN TypeOperation ot ON o.idType = ot.idType
JOIN Actor a ON o.idActor = a.idActor
JOIN Warehouse w ON o.idWarehouse = w.idWarehouse


SELECT * from OperationInfo;

select * from OperationDetails;