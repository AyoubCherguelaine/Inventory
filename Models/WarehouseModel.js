
const  {connection} = require("./db"); // Assuming you have a database connection module



class WarehouseModelSimpleCrud {
    static async create(warehouseData,callback) {
      try {
        const query = `INSERT INTO Warehouse (warehouseName, Reference) VALUES (${ warehouseData.warehouseName}, ${warehouseData.Reference})`;
       
       
        await connection.query(query,(err,result)=>{
          callback(err,{ id: result.insertId, ...warehouseData })
        })

      } catch (error) {
        throw error;
      }
    }
  
    static async findById(id,callback) {
      try {
        const query = `SELECT * FROM Warehouse WHERE idWarehouse = ${id}`;
        connection.query(query,(err,result)=>{
          callback(err,result)
        } );
      } catch (error) {
        throw error;
      }
    }
  
    static async findAll(callback) {
      try {
        const query = 'SELECT * FROM Warehouse';
        connection.query(query, (err,result)=>{
          callback(err,result)
        });
      } catch (error) {
        throw error;
      }
    }
    static async find(query, callback) {
      let q = 'SELECT * FROM Warehouse WHERE 1=1';
    
      const conditions = [];
      const values = [];
    
      if (query.hasOwnProperty('idWarehouse')) {
        conditions.push('idWarehouse = ?');
        values.push(query['idWarehouse']);
      }
      if (query.hasOwnProperty('warehouseName')) {
        conditions.push('warehouseName LIKE ?');
        values.push(`%${query['warehouseName']}%`);
      }
      if (query.hasOwnProperty('Reference')) {
        conditions.push('Reference LIKE ?');
        values.push(`%${query['Reference']}%`);
      }
    
      if (conditions.length > 0) {
        q += ' AND ' + conditions.join(' AND ');
      }
    
      connection.query(q, values, (err, result) => {
        callback(err, result);
      });
    }
    
  }
  


  class Article_in_warehouseModelSimpleCrud {
    static async create(Article_in_warehouseData,callback) {
      try {
        const query = `INSERT INTO Article_in_warehouse (
          idWarehouse, idArticle, Quantity, Lot) 
        VALUES (${ Article_in_warehouseData.idWarehouse},
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
  
    static async findById(idWarehouse,idArticle,callback) {
      try {
        const query = `SELECT * FROM Article_in_warehouse WHERE
        idWarehouse = ${idWarehouse} and idArticle = ${idArticle}`;
        connection.query(query,(err,result)=>{
          callback(err,result)
        } );
      } catch (error) {
        throw error;
      }
    }
  
    static async findAll(callback) {
      try {
        const query = 'SELECT * FROM Article_in_warehouse';
        connection.query(query, (err,result)=>{
          callback(err,result)
        });
      } catch (error) {
        throw error;
      }
    }
  
    static async find(query, callback) {
      let q = 'SELECT * FROM Article_in_warehouse WHERE 1=1';
    
      const conditions = [];
      const values = [];
    
      if (query.hasOwnProperty('idWarehouse')) {
        conditions.push('idWarehouse = ?');
        values.push(query['idWarehouse']);
      }
      if (query.hasOwnProperty('idArticle')) {
        conditions.push('idArticle = ?');
        values.push(query['idArticle']);
      }
      if (query.hasOwnProperty('Quantity')) {
        conditions.push('Quantity = ?');
        values.push(query['Quantity']);
      }
      if (query.hasOwnProperty('Lot')) {
        conditions.push('Lot LIKE ?');
        values.push(`%${query['Lot']}%`);
      }
    
      if (conditions.length > 0) {
        q += ' AND ' + conditions.join(' AND ');
      }
    
      connection.query(q, values, (err, result) => {
        callback(err, result);
      });
    }
    
  }

module.exports = {
  WarehouseModel: Warehouse,
    Article_in_warehouseModel:  Article_in_warehouse
}
