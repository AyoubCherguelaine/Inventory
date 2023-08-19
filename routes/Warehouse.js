const express = require('express');
const {WarehouseController,Article_in_warehouseController} = require('../Controllers/WarehouseController');

const router = express.Router();

// Create a new Warehouse
router.post('/', WarehouseController.createWarehouse);

// Get a specific Warehouse by ID
router.get('/:id', WarehouseController.getWarehouse);

// Get all Warehouse
router.get('/', WarehouseController.getAllWarehouses);


// Define more routes for updating and deleting Dimensions


// Create a new Article_in_warehouse 
router.post('/article/', Article_in_warehouseController.createArticle_in_warehouse);

// Get a specific Article_in_warehouse by ID
router.get('/article/:idwarehouse/:idArticle', Article_in_warehouseController.getArticle_in_warehouse);

// Get all Article_in_warehouse
router.get('/article/', Article_in_warehouseController.getAllArticle_in_warehouse);



module.exports = router;
