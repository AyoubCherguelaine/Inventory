-- drop database web;

-- create database web;

-- use web;

create table Article(
	idArticle int primary key auto_increment,
	Name text,
	SalePrice double,
	Cost double,
	Reference text,
	BarCode text
);

create table Dimension(
	idDimension int auto_increment primary key,
	description text,
	Title text
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
    constraint FK_AIS_Dimension foreign key (idDimension) references Dimension(idDimension)
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
     constraint FK_OpAr_Dimension foreign key (idDimension) references Dimension(idDimension)
);
