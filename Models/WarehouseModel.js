const pool = require("./db"); // Assuming you have a database connection module



class WarehouseModel {
    async create(warehouseData) {
      try {
        const query = 'INSERT INTO warehouse (warehouseName, Reference) VALUES (?, ?)';
        const values = [
            warehouseData.warehouseName,
            warehouseData.Reference
        ];
  
        const [result] = await pool.query(query, values);
        return { id: result.insertId, ...warehouseData };
      } catch (error) {
        throw error;
      }
    }
  
    async findById(id) {
      try {
        const query = 'SELECT * FROM warehouse WHERE idwarehouse = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0];
      } catch (error) {
        throw error;
      }
    }
  
    async findAll() {
      try {
        const query = 'SELECT * FROM warehouse';
        const [rows] = await pool.query(query);
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    // You can add more methods for updating and deleting articles as needed
  }
  
module.exports = {
    WarehouseModel:WarehouseModel()
}
