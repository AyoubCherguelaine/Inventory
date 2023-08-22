const express = require('express');
const {TypeOperationController,OperationController,LineOperationController } = require("../Controllers/Operation")

const router = express.Router();


// Create a new Operation
router.post('/', OperationController.createOperation);

// Get a specific Operation by ID
router.get('/:id', OperationController.getOperation);

// Get all Operation
router.get('/', OperationController.getAllOperation);


// Create a new type
router.post('/type', TypeOperationController.createTypeOperation);

// Get a specific type by ID
router.get('/type/:id', TypeOperationController.getTypeOperation);

// Get all type
router.get('/type', TypeOperationController.getAllTypeOperation);




module.exports = router;
