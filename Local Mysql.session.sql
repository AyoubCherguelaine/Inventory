

create table BaseArticle(
	idBaseArticle int primary key auto_increment,
	Name text
);

create table Dimension(
	idDimension int auto_increment primary key,
	description text,
	Title text
);

Create Table Article(
    idArticle int primary key auto_increment,
    SalePrice double,
	Cost double,
	Reference text,
	BarCode text,
    idBaseArticle int,
    idDimension int,
    constraint FK_Base_article FOREIGN KEY (idBaseArticle) REFERENCES BaseArticle(idBaseArticle),
    constraint FK_Demension_article FOREIGN KEY (idDimension) REFERENCES Dimension(idDimension)
);


create table Actor(
	idActor int primary key auto_increment,
	Name text,
	Reference text
);


create table warehouse(
	idwarehouse int primary key auto_increment,
	warehouseName text,
	Reference text
);

create table Article_in_warehouse(
	idwarehouse int,
	idArticle int,
	Quantity long,
	Lot text,
	primary key(idwarehouse,idArticle),
	constraint FK_AIS_Article foreign key (idArticle) references Article(idArticle),
	constraint FK_AIS_Stock foreign key (idwarehouse) references warehouse(idwarehouse)
);


create table TypeOperation(
	idType int primary key auto_increment,
	Title text,
    favorite BOOLEAN
);




create table Operation(
	idOperation int primary key auto_increment,
	idType int,
    idActor int,
	idwarehouse int,
	DateOp datetime,
	Confirme BOOLEAN,
	constraint FK_OPTYPE foreign key (idType) references TypeOperation(idType),
    constraint FK_Tr_Actor foreign key (idActor) references Actor(idActor),
	constraint FK_Operation_warehouse foreign key (idwarehouse) references warehouse(idwarehouse)
);


create table LineOperation(
    idLineOperation int PRIMARY KEY auto_increment,
    idArticle int ,
	idOperation int,
	Quantity int,
    constraint FK_OA_Article foreign key (idArticle) references Article(idArticle),
    constraint FK_OA_OpAr foreign key (idOperation) references Operation(idOperation)
);

-- Inserting the new types of operations
INSERT INTO TypeOperation (Title, favorite)
VALUES ('Receipts', true), ('Delivery Orders', true);



set global log_bin_trust_function_creators=1;

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



CREATE VIEW ArticleInfo AS
SELECT
    a.idArticle,
    ba.Name AS BaseArticleName,
    d.Title AS DimensionTitle,
    a.SalePrice,
    a.Cost,
    a.Reference,
    a.BarCode
FROM Article a
JOIN BaseArticle ba ON a.idBaseArticle = ba.idBaseArticle
JOIN Dimension d ON a.idDimension = d.idDimension;



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
ORDER BY o.DateOp; -- You can adjust the number of recent operations shown


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
JOIN warehouse w ON aiw.idwarehouse = w.idwarehouse;


CREATE VIEW ActorOperations AS
SELECT
    a.idActor,
    a.Name AS ActorName,
    a.Reference AS ActorReference,
    a.LocalStock,
    o.idOperation,
    ot.Title AS OperationType,
    w.warehouseName,
    o.DateOp,
    o.Confirme
FROM Actor a
LEFT JOIN Operation o ON a.idActor = o.idActor
LEFT JOIN TypeOperation ot ON o.idType = ot.idType
LEFT JOIN warehouse w ON o.idwarehouse = w.idwarehouse;


CREATE VIEW ActorBoughtArticles AS
SELECT
    a.idActor,
    a.Name AS ActorName,
    a.Reference AS ActorReference,
    a.LocalStock,
    oa.idArticle,
    ba.Name AS ArticleName,
    oa.Quantity AS BoughtQuantity
FROM Actor a
JOIN Operation o ON a.idActor = o.idActor
JOIN LineOperation oa ON o.idOperation = oa.idOperation
JOIN Article art ON oa.idArticle = art.idArticle
JOIN BaseArticle ba ON art.idBaseArticle = ba.idBaseArticle;


CREATE VIEW WarehouseOperations AS
SELECT
    w.idwarehouse,
    w.warehouseName,
    o.idOperation,
    ot.Title AS OperationType,
    a.Name AS ActorName,
    o.DateOp,
    o.Confirme
FROM warehouse w
LEFT JOIN Operation o ON w.idwarehouse = o.idwarehouse
LEFT JOIN TypeOperation ot ON o.idType = ot.idType
LEFT JOIN Actor a ON o.idActor = a.idActor;