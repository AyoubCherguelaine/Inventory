const {connection} = require("./db"); 


class TypeOperation{
    static async create(TypeOperationData,callback){
        let query = `INSERT INTO TypeOperation
        (Title,Favorite) values
        (?,?)`
        let values = [
            TypeOperationData.Title,
            TypeOperationData.Favorite
        ]
        connection.query(query, values, (error, result) => {
            callback(error, result);
          });
    }

    static async findById(id,callback){
        let query = "SELECT * FROM TypeOperation WHERE idType=?"
        connection.query(query,[id],(err,result)=>{
            callback(err,result)
        })
    }

    static async findAll(callback){
        let query = "SELECT * FROM TypeOperation"
        connection.query(query,(err,result)=>{
            callback(err,result)
        })
    }

    static async find(query, callback) {
        let q = 'SELECT * FROM TypeOperation WHERE 1=1';
      
        const conditions = [];
        const values = [];
      
        if (query.hasOwnProperty('idTypeOperation')) {
          conditions.push('idTypeOperation = ?');
          values.push(query['idTypeOperation']);
        }
        if (query.hasOwnProperty('Title')) {
          conditions.push('Title LIKE ?');
          values.push(`%${query['Title']}%`);
        }
        if (query.hasOwnProperty('Favorite')) {
          conditions.push('Favorite LIKE ?');
          values.push(`%${query['Favorite']}%`);
        }
      
        if (conditions.length > 0) {
          q += ' AND ' + conditions.join(' AND ');
        }
      
        connection.query(q, values, (err, result) => {
          callback(err, result);
        });
      }
      
}

class Operation{
    static async create(OperationData,callback){

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

    static async findById(id,callback){
        let query = "SELECT * FROM Operation WHERE idOperation=?"
        connection.query(query,[id],(err,result)=>{
            callback(err,result)
        })
    }

    static async findAll(callback){
        let query = "SELECT * FROM Operation"
        connection.query(query,(err,result)=>{
            callback(err,result)
        })
    }

    static async find(query, callback) {
        let q = 'SELECT * FROM Operation WHERE 1=1';
      
        const conditions = [];
        const values = [];
      
        if (query.hasOwnProperty('idOperation')) {
          conditions.push('idOperation = ?');
          values.push(query['idOperation']);
        }
        if (query.hasOwnProperty('idType')) {
          conditions.push('idType = ?');
          values.push(query['idType']);
        }
        if (query.hasOwnProperty('idActor')) {
          conditions.push('idActor = ?');
          values.push(query['idActor']);
        }
        if (query.hasOwnProperty('DateOp')) {
          conditions.push('DateOp = ?');
          values.push(query['DateOp']);
        }
        if (query.hasOwnProperty('idwarehouse')) {
          conditions.push('idwarehouse = ?');
          values.push(query['idwarehouse']);
        }
        if (query.hasOwnProperty('Confirme')) {
          conditions.push('Confirme = ?');
          values.push(query['Confirme']);
        }
      
        if (conditions.length > 0) {
          q += ' AND ' + conditions.join(' AND ');
        }
      
        connection.query(q, values, (err, result) => {
          callback(err, result);
        });
      }
      
}

class LineOperation{
    static async create(LineOperationData,callback){
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

    static async findById(id,callback){
        let query = "SELECT * FROM LineOperation WHERE idLineOperation=?"
        connection.query(query,[id],(err,result)=>{
            callback(err,result)
        })
    }

    static async findAll(callback){
        let query = "SELECT * FROM LineOperation"
        connection.query(query,(err,result)=>{
            callback(err,result)
        })
    }
    static async find(query, callback) {
        let q = 'SELECT * FROM LineOperation WHERE 1=1';
      
        const conditions = [];
        const values = [];
      
        if (query.hasOwnProperty('idLineOperation')) {
          conditions.push('idLineOperation = ?');
          values.push(query['idLineOperation']);
        }
        if (query.hasOwnProperty('idArticle')) {
          conditions.push('idArticle = ?');
          values.push(query['idArticle']);
        }
        if (query.hasOwnProperty('idOperation')) {
          conditions.push('idOperation = ?');
          values.push(query['idOperation']);
        }
        if (query.hasOwnProperty('Quantity')) {
          conditions.push('Quantity = ?');
          values.push(query['Quantity']);
        }
      
        if (conditions.length > 0) {
          q += ' AND ' + conditions.join(' AND ');
        }
      
        connection.query(q, values, (err, result) => {
          callback(err, result);
        });
      }
      
}

module.exports= {
    TypeOperation:  TypeOperation,
    Operation:  Operation,
    LineOperation:  LineOperation
}


