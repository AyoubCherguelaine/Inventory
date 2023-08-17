

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
	Reference text,
	LocalStock bool
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
    idActorShipper int,
    idActorReceipt int,
	idwarehouse int,
	DateOp datetime,
	Confirme BOOLEAN,
	constraint FK_OPTYPE foreign key (idType) references TypeOperation(idType),
    constraint FK_Tr_Actor_shipper foreign key (idActorShipper) references Actor(idActor),
	constraint FK_Tr_Actors foreign key (idActorReceipt) references Actor(idActor),
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




DELIMITER //
CREATE PROCEDURE UpdateWarehouseQuantity(IN opId INT, IN artId INT, IN qty INT)
BEGIN
    DECLARE typeId INT;
    DECLARE wareId INT;
    
    -- Get the type of operation and warehouse ID
    SELECT idType, idwarehouse INTO typeId, wareId FROM Operation WHERE idOperation = opId;
    
    IF typeId IS NOT NULL AND wareId IS NOT NULL THEN
        CASE typeId
            WHEN (SELECT idType FROM TypeOperation WHERE Title = 'Receipts') THEN
                -- For Receipts, increase the quantity in the warehouse
                UPDATE Article_in_warehouse
                SET Quantity = Quantity + qty
                WHERE idArticle = artId AND idwarehouse = wareId;
                
            WHEN (SELECT idType FROM TypeOperation WHERE Title = 'Delivery Orders') THEN
                -- For Delivery Orders, decrease the quantity in the warehouse
                UPDATE Article_in_warehouse
                SET Quantity = Quantity - qty
                WHERE idArticle = artId AND idwarehouse = wareId;
                
            
        END CASE;
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


CREATE VIEW WarehouseStock AS
SELECT
    w.warehouseName,
    a.idArticle,
    aiw.Quantity,
    a.Reference,
    a.BarCode
FROM Article_in_warehouse aiw
JOIN Article a ON aiw.idArticle = a.idArticle
JOIN warehouse w ON aiw.idwarehouse = w.idwarehouse;


CREATE VIEW RecentOperations AS
SELECT
    o.idOperation,
    ot.Title AS OperationType,
    o.idActorShipper,
    o.idActorReceipt,
    o.idwarehouse,
    o.DateOp,
    o.Confirme
FROM Operation o
JOIN TypeOperation ot ON o.idType = ot.idType
ORDER BY o.DateOp DESC
LIMIT 10; -- You can adjust the number of recent operations shown
