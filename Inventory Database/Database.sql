drop database Pro;

create database Pro;

use Pro;


create table Article(
idArticle int primary key auto_increment,
Name text,
SalePrice double,
Cost double,
Reference text,
BarCode text
);

create table Dim(
idDimension int auto_increment primary key,
description text,
Title text);

create table DimensionArticle(
idArticle int ,
idDimension int,
primary key(idDimension,idArticle),
constraint FK_Dim_Art foreign key (idArticle) references Article(idArticle),
constraint FK_Dim_Dim foreign key (idDimension) references Dim(idDimension)
);



create table Actor(
idActor int primary key auto_increment,
Name text,
Reference text,
LocalStock bool
);

create table Stock(
	idStock int primary key auto_increment,
	Name text,
	idActor int,
	Reference text,
	constraint FK_Stock_Actor foreign key (idActor) references Actor(idActor)

);

create table Article_in_Stock(
	idStock int,
	idArticle int,
    idDimension int,
	Quantity long,
	Lot text,
	primary key(idStock,idArticle),
	constraint FK_AIS_Article foreign key (idArticle) references Article(idArticle),
	constraint FK_AIS_Stock foreign key (idStock) references Stock(idStock),
    constraint FK_AIS_Dimension foreign key (idDimension) references Dim(idDimension)
);


create table TypeOperation(
	idType int primary key auto_increment,
	Title text,
    idActorshipper int,
    idActorReceipt int,
    constraint FK_Tr_Actor_shipper foreign key (idActorshipper) references Actor(idActor),
	constraint FK_Tr_Actors foreign key (idActorReceipt) references Actor(idActor)
);

create table TypeOperationSaved(
idTOS int auto_increment primary key ,
idType int ,
TitleSaved text,
constraint FK_TOS_TO foreign key (idType) references TypeOperation(idType)
);


create table Operation(
	idOperation int primary key auto_increment,
	idType int,
	Title text,
	DateOp datetime,
	constraint FK_OPTYPE foreign key (idType) references TypeOperation(idType)
);




create table OperationList(
	idOperation int,
	idOpAr int primary key auto_increment,
	
	Note text,
    constraint FK_OpList_Operation foreign key (idOperation) references Operation(idOperation)
    
);


create table OperationArticle(
	idArticle int ,
	idOpAr int,
    idDimension int,
	Quantity int,
    primary key(idOpAr,idArticle),
    constraint FK_OA_Article foreign key (idArticle) references Article(idArticle),
    constraint FK_OA_OpAr foreign key (idOpAr) references OperationList(idOpAr),
     constraint FK_OpAr_Dimension foreign key (idDimension) references Dim(idDimension)
);

-- view to see all Article with dimension
create view Article_Dimension as select  concat('[',D.title,']',A.Name) Article , A.idArticle,DA.idDimension , A.Reference from Article A inner join DimensionArticle DA inner join Dim D on
A.idArticle = DA.idArticle and
DA.idDimension = D.idDimension;

-- view to see actor (fournisseur, client)
create view Actor_External as select idActor,Name,Reference  from Actor where LocalStock = false;

-- view ro see stock actor in Operation
create view Actor_Stock as select idActor,Name,Reference from Actor where LocalStock = true;

-- view to see all shipper in type operation
create view TypeOperationShipper as 
select idType,Title,idActorshipper as idActor,idActorReceipt,Name,Reference  from TypeOperation T join Actor A on T.idActorshipper = A.idActor  group by  idActorshipper;

-- view to see all Receipt
create view TypeOperationReceipt as 
select * from TypeOperation T join Actor A on T.idActorReceipt = A.idActor  group by  idActorReceipt;


