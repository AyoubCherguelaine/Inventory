
const  {connection} = require("./db"); // Assuming you have a database connection module



class WarehouseModel {
    async create(warehouseData,callback) {
      try {
        const query = `INSERT INTO warehouse (warehouseName, Reference) VALUES (${ warehouseData.warehouseName}, ${warehouseData.Reference})`;
       
       
        await connection.query(query,(err,result)=>{
          callback(err,{ id: result.insertId, ...warehouseData })
        })

      } catch (error) {
        throw error;
      }
    }
  
    async findById(id,callback) {
      try {
        const query = `SELECT * FROM warehouse WHERE idwarehouse = ${id}`;
        connection.query(query,(err,result)=>{
          callback(err,result)
        } );
      } catch (error) {
        throw error;
      }
    }
  
    async findAll(callback) {
      try {
        const query = 'SELECT * FROM warehouse';
        connection.query(query, (err,result)=>{
          callback(err,result)
        });
      } catch (error) {
        throw error;
      }
    }
  
    // You can add more methods for updating and deleting articles as needed
  }
  


  class Article_in_warehouseModel {
    async create(Article_in_warehouseData,callback) {
      try {
        const query = `INSERT INTO Article_in_warehouse (
          idwarehouse, idArticle, Quantity, Lot) 
        VALUES (${ Article_in_warehouseData.idwarehouse},
           ${Article_in_warehouseData.idArticle},
            ${Article_in_warehouseData.Quantity},
             ${Article_in_warehouseData.Lot})`;
       
       
        await connection.query(query,(err,result)=>{
          callback(err,{ id: result.insertId, ...warehouseData })
        })

      } catch (error) {
        throw error;
      }
    }
  
    async findById(idwarehouse,idArticle,callback) {
      try {
        const query = `SELECT * FROM Article_in_warehouse WHERE
         idwarehouse = ${idwarehouse} and idArticle = ${idArticle}`;
        connection.query(query,(err,result)=>{
          callback(err,result)
        } );
      } catch (error) {
        throw error;
      }
    }
  
    async findAll(callback) {
      try {
        const query = 'SELECT * FROM Article_in_warehouse';
        connection.query(query, (err,result)=>{
          callback(err,result)
        });
      } catch (error) {
        throw error;
      }
    }
  
    // You can add more methods for updating and deleting articles as needed
  }

module.exports = {
  WarehouseModel:new WarehouseModel(),
    Article_in_warehouseModel: new Article_in_warehouseModel()
}
