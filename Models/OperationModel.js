const {connection} = require("./db"); 


class TypeOperation{
    async create(TypeOperationData,callback){
        let query = `INSERT INTO TypeOperation
        (Title,favorite) values
        (?,?)`
        let values = [
            TypeOperationData.Title,
            TypeOperationData.favorite
        ]
        connection.query(query, values, (error, result) => {
            callback(error, result);
          });
    }

    async findById(id,callback){
        let query = "SELECT * FROM TypeOperation WHERE idType=?"
        connection.query(query,[id],(err,result)=>{
            callback(err,result)
        })
    }

    async findAll(callback){
        let query = "SELECT * FROM TypeOperation"
        connection.query(query,(err,result)=>{
            callback(err,result)
        })
    }
}

class Operation{
    async create(OperationData,callback){

        let query = `INSERT INTO Operation
        (idType,idActor,DateOp,idwarehouse,Confirme) values
        (?,?,?,?,?)`
        let values = [
            OperationData.idType,
            OperationData.idActor,
            OperationData.DateOp,
            OperationData.idwarehouse,
            OperationData.Confirme
        ]
        connection.query(query, values, (error, result) => {
            callback(error, result);
          });
    }

    async findById(id,callback){
        let query = "SELECT * FROM Operation WHERE idOperation=?"
        connection.query(query,[id],(err,result)=>{
            callback(err,result)
        })
    }

    async findAll(callback){
        let query = "SELECT * FROM Operation"
        connection.query(query,(err,result)=>{
            callback(err,result)
        })
    }
}

class LineOperation{
    async create(LineOperationData,callback){
        let query = `INSERT INTO LineOperation
        (idArticle,idOperation,Quantity) values
        (?,?,?)`
        let values = [
            LineOperationData.idArticle,
            LineOperationData.idOperation,
            LineOperationData.Quantity
        ]
        connection.query(query, values, (error, result) => {
            callback(error, result);
          });
    }

    async findById(id,callback){
        let query = "SELECT * FROM LineOperation WHERE idLineOperation=?"
        connection.query(query,[id],(err,result)=>{
            callback(err,result)
        })
    }

    async findAll(callback){
        let query = "SELECT * FROM LineOperation"
        connection.query(query,(err,result)=>{
            callback(err,result)
        })
    }
}

module.exports= {
    TypeOperation: new TypeOperation(),
    Operation: new Operation(),
    LineOperation: new LineOperation()
}


