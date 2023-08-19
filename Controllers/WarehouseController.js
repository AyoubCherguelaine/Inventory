const {WarehouseModel} = require('../Models/warehouseModel');

class WarehouseController {
  async createWarehouse(req, res) {
    try {
      const newWarehouse = req.body;
      await WarehouseModel.create(newWarehouse,(err,result)=>{
        if(err) res.status(500).json(err)
        else{
          res.status(201).json(result);
        }
      });
     
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the Warehouse' });
    }
  }

  async getWarehouse(req, res) {
    try {
      const WarehouseId = parseInt(req.params.id);
      await WarehouseModel.findById(WarehouseId,(err,result)=>{
        if(err) res.status(500).json(err)
        else{
          let Warehouse = result[0]
          if (Warehouse) {
            res.json(Warehouse);
          } else {
            res.status(404).json({ message: 'Warehouse not found' });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Warehouse' });
    }
  }

  async getAllWarehouses(req, res) {
    try {
        await WarehouseModel.findAll((err,result)=>{
        if(err) res.status(500).json(err)
        else{
          res.status(201).json(result);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Warehouses' });
    }
  }

  // You can add more controller methods for updating and deleting Warehouses as needed
}

module.exports= {
  WarehouseController:new WarehouseController()
}