const {WarehouseModel} = require('../Models/warehouseModel');

class WarehouseController {
  async createWarehouse(req, res) {
    try {
      const newWarehouse = req.body;
      const createdWarehouse = await WarehouseModel.create(newWarehouse);
      res.status(201).json(createdWarehouse);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the Warehouse' });
    }
  }

  async getWarehouse(req, res) {
    try {
      const WarehouseId = parseInt(req.params.id);
      const Warehouse = await WarehouseModel.findById(WarehouseId);
      if (Warehouse) {
        res.json(Warehouse);
      } else {
        res.status(404).json({ message: 'Warehouse not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Warehouse' });
    }
  }

  async getAllWarehouses(req, res) {
    try {
      const Warehouses = await WarehouseModel.findAll();
      res.json(Warehouses);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Warehouses' });
    }
  }

  // You can add more controller methods for updating and deleting Warehouses as needed
}

module.exports= {
  WarehouseController:WarehouseController()
}