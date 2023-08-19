const express = require('express');
const {DimensionController} = require('../Controllers/ArticleController');

const router = express.Router();

// Create a new Dimension
router.post('/', DimensionController.createDimension);

// Get a specific Dimension by ID
router.get('/:id', DimensionController.getDimension);

// Get all Dimensions
router.get('/', DimensionController.getAllDimensions);


// Define more routes for updating and deleting Dimensions

module.exports = router;
