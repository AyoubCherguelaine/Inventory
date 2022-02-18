use Pro;

/* inset new TypeOperation

insert into TypeOperation(Title,idActorshipper,idActorReceipt) values ('Action0001',3,2), ('Actionintern001',2,1);
*/
select * from TypeOperation;

/*
insert into TOS

insert into TypeOperationSaved(idType,TitleSaved) values (2,'Garage 1 -> Garage 2');
*/
select * from Operation;


select idType,Title,idActorshipper as idActorShipper,idActorReceipt,Name,Reference from TypeOperationShipper;

select idType,Title,idActorReceipt as idActorReceipt,idActorshipper,Name,Reference from TypeOperationReceipt;

