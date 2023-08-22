-- Table: BaseArticle
CREATE TABLE BaseArticle (
    idBaseArticle INT PRIMARY KEY AUTO_INCREMENT,
    Name TEXT
);

-- Table: Dimension
CREATE TABLE Dimension (
    idDimension INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    Title TEXT
);

-- Table: Article
CREATE TABLE Article (
    idArticle INT PRIMARY KEY AUTO_INCREMENT,
    SalePrice DOUBLE,
    Cost DOUBLE,
    Reference TEXT,
    BarCode TEXT,
    idBaseArticle INT,
    idDimension INT,
    FOREIGN KEY (idBaseArticle) REFERENCES BaseArticle(idBaseArticle),
    FOREIGN KEY (idDimension) REFERENCES Dimension(idDimension)
);

-- Table: Actor
CREATE TABLE Actor (
    idActor INT PRIMARY KEY AUTO_INCREMENT,
    Name TEXT,
    Reference TEXT
);

-- Table: Warehouse
CREATE TABLE Warehouse (
    idWarehouse INT PRIMARY KEY AUTO_INCREMENT,
    warehouseName TEXT,
    Reference TEXT
);

-- Table: Article_in_warehouse
CREATE TABLE Article_in_warehouse (
    idWarehouse INT,
    idArticle INT,
    Quantity LONG,
    Lot TEXT,
    PRIMARY KEY (idWarehouse, idArticle),
    FOREIGN KEY (idArticle) REFERENCES Article(idArticle),
    FOREIGN KEY (idWarehouse) REFERENCES Warehouse(idWarehouse)
);

-- Table: TypeOperation
CREATE TABLE TypeOperation (
    idType INT PRIMARY KEY AUTO_INCREMENT,
    Title TEXT,
    Favorite BOOLEAN
);

-- Table: Operation
CREATE TABLE Operation (
    idOperation INT PRIMARY KEY AUTO_INCREMENT,
    idType INT,
    idActor INT,
    idWarehouse INT,
    DateOp DATETIME,
    Confirme BOOLEAN,
    FOREIGN KEY (idType) REFERENCES TypeOperation(idType),
    FOREIGN KEY (idActor) REFERENCES Actor(idActor),
    FOREIGN KEY (idWarehouse) REFERENCES Warehouse(idWarehouse)
);

-- Table: LineOperation
CREATE TABLE LineOperation (
    idLineOperation INT PRIMARY KEY AUTO_INCREMENT,
    idArticle INT,
    idOperation INT,
    Quantity INT,
    FOREIGN KEY (idArticle) REFERENCES Article(idArticle),
    FOREIGN KEY (idOperation) REFERENCES Operation(idOperation)
);


-- FUNCTION

-- Set global log_bin_trust_function_creators to 1
SET GLOBAL log_bin_trust_function_creators = 1;

-- Function: UpdateWarehouseQuantity
DELIMITER //
CREATE FUNCTION UpdateWarehouseQuantity(operationId INT) RETURNS BOOLEAN
    DETERMINISTIC
    READS SQL DATA
BEGIN

    DECLARE done INT DEFAULT FALSE;
    DECLARE articleId, warehouseId, quantityToUpdate INT;
    DECLARE cur CURSOR FOR
        SELECT idArticle, idwarehouse, Quantity
        FROM LineOperation
        WHERE idOperation = operationId;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO articleId, warehouseId, quantityToUpdate;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Update the Article_in_warehouse table with the new quantity
        UPDATE Article_in_warehouse
        SET Quantity = Quantity + quantityToUpdate
        WHERE idwarehouse = warehouseId AND idArticle = articleId;
    END LOOP;
    
    CLOSE cur;
    
    RETURN TRUE;
END;
//
DELIMITER ;

-- Trigger: After_Update_Confirm
DELIMITER //
CREATE TRIGGER After_Update_Confirm
AFTER UPDATE ON Operation
FOR EACH ROW
BEGIN
    DECLARE old_confirme BOOLEAN;
    
    IF NEW.Confirme = TRUE AND OLD.Confirme = FALSE THEN
        CALL UpdateWarehouseQuantity(OLD.idOperation);
    END IF;
END;
//
DELIMITER ;

-- Function: IsArticleQuantityAvailable
DELIMITER //
CREATE FUNCTION IsArticleQuantityAvailable(articleId INT, warehouseId INT, requestedQuantity INT) RETURNS BOOLEAN
    DETERMINISTIC
    READS SQL DATA
BEGIN
     DECLARE availableQuantity INT;
    
    -- Get the available quantity of the article in the warehouse
    SELECT Quantity INTO availableQuantity
    FROM Article_in_warehouse
    WHERE idArticle = articleId AND idwarehouse = warehouseId;
    
    -- Check if the available quantity is sufficient for the requested quantity
    IF availableQuantity >= requestedQuantity THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
//
DELIMITER ;



-- VIEWS

drop VIEW `ArticleInfo`;
-- View: ArticleInfo
CREATE VIEW ArticleInfo AS
SELECT
    a.idArticle,
    CONCAT(ba.Name ,' ',d.Title) as ArticleName,
    ba.`idBaseArticle`,
    ba.Name AS BaseName,
    d.`idDimension`,
    d.Title AS Dimension,
    a.SalePrice,
    a.Cost,
    a.Reference,
    a.BarCode
FROM Article a
JOIN BaseArticle ba ON a.idBaseArticle = ba.idBaseArticle
JOIN Dimension d ON a.idDimension = d.idDimension;


-- View: RecentOperations
CREATE VIEW RecentOperations AS
SELECT
    o.idOperation,
    ot.Title AS OperationType,
    o.idActor,
    o.idwarehouse,
    o.DateOp,
    o.Confirme
FROM Operation o
JOIN TypeOperation ot ON o.idType = ot.idType
ORDER BY o.DateOp;


-- View: ArticleWarehouseDetails
CREATE VIEW ArticleWarehouseDetails AS
SELECT
    a.idArticle,
    a.Reference,
    a.BarCode,
    ba.`idBaseArticle`,
    ba.Name AS BaseArticleName,
    d.`idDimension`,
    d.Title AS DimensionTitle,
    w.idwarehouse,
    w.warehouseName,
    aiw.`Lot`,
    aiw.Quantity AS WarehouseQuantity
FROM Article a
JOIN BaseArticle ba ON a.idBaseArticle = ba.idBaseArticle
JOIN Dimension d ON a.idDimension = d.idDimension
JOIN Article_in_warehouse aiw ON a.idArticle = aiw.idArticle
JOIN Warehouse w ON aiw.idwarehouse = w.idwarehouse;


-- View: ActorOperations
CREATE VIEW ActorOperations AS
SELECT
    a.idActor,
    a.Name AS ActorName,
    a.Reference AS ActorReference,
    o.idOperation,
    ot.Title AS OperationType,
    w.warehouseName,
    o.DateOp,
    o.Confirme
FROM Actor a
LEFT JOIN Operation o ON a.idActor = o.idActor
LEFT JOIN TypeOperation ot ON o.idType = ot.idType
LEFT JOIN Warehouse w ON o.idwarehouse = w.idwarehouse;


-- View: ActorBoughtArticles
CREATE VIEW ActorBoughtArticles AS
SELECT
    a.idActor,
    a.Name AS ActorName,
    a.Reference AS ActorReference,
    oa.idArticle,
    ba.Name AS ArticleName,
    oa.Quantity AS BoughtQuantity
FROM Actor a
JOIN Operation o ON a.idActor = o.idActor
JOIN LineOperation oa ON o.idOperation = oa.idOperation
JOIN Article art ON oa.idArticle = art.idArticle
JOIN BaseArticle ba ON art.idBaseArticle = ba.idBaseArticle;



-- View: WarehouseOperations
CREATE VIEW WarehouseOperations AS
SELECT
    w.idwarehouse,
    w.warehouseName,
    o.idOperation,
    ot.Title AS OperationType,
    a.Name AS ActorName,
    o.DateOp,
    o.Confirme
FROM Warehouse w
LEFT JOIN Operation o ON w.idwarehouse = o.idwarehouse
LEFT JOIN TypeOperation ot ON o.idType = ot.idType
LEFT JOIN Actor a ON o.idActor = a.idActor;


CREATE VIEW OperationDetails AS
SELECT
    o.idOperation,
    ot.idType,
    ot.Title AS OperationType,
    a.idActor,
    a.Name AS ActorName,
    w.idWarehouse,
    w.warehouseName,
    o.DateOp,
    o.Confirme,
    oa.idArticle,
    ba.Name AS ArticleName,
    oa.Quantity AS Quantity,
    aow.Lot AS ArticleLot
FROM Operation o
JOIN TypeOperation ot ON o.idType = ot.idType
JOIN Actor a ON o.idActor = a.idActor
JOIN Warehouse w ON o.idWarehouse = w.idWarehouse
LEFT JOIN LineOperation oa ON o.idOperation = oa.idOperation
LEFT JOIN Article art ON oa.idArticle = art.idArticle
LEFT JOIN BaseArticle ba ON art.idBaseArticle = ba.idBaseArticle
LEFT JOIN Article_in_warehouse aow ON o.idWarehouse = aow.idWarehouse AND oa.idArticle = aow.idArticle;