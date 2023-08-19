const {WarehouseModel,Article_in_warehouseModel} = require('../Models/WarehouseModel');

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


class Article_in_warehouseController {
  async createArticle_in_warehouse(req, res) {
    try {
      const newArticle_in_warehouseModel = req.body;
      await Article_in_warehouseModel.create(newArticle_in_warehouseModel,(err,result)=>{
        if(err) res.status(500).json(err)
        else{
          res.status(201).json(result);
        }
      });
     
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the Warehouse' });
    }
  }

  async getArticle_in_warehouse(req, res) {
    console.log("call find one")
    try {
      const WarehouseId = parseInt(req.params.idwarehouse);
      const ArticleId= parseInt(req.params.idArticle);
      await Article_in_warehouseModel.findById(WarehouseId,ArticleId,(err,result)=>{
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

  async getAllArticle_in_warehouse(req, res) {
    console.log("call find all")
    try {
        await Article_in_warehouseModel.findAll((err,result)=>{
          console.log(err)
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
  WarehouseController:new WarehouseController(),
  Article_in_warehouseController : new Article_in_warehouseController()
}