const express = require('express');
const {DimensionController} = require('../Controllers/ArticleController');

const router = express.Router();

// Create a new article
router.post('/', DimensionController.createArticle);

// Get a specific article by ID
router.get('/:id', DimensionController.getArticle);

// Get all articles
router.get('/', DimensionController.getAllArticles);


// Define more routes for updating and deleting articles

module.exports = router;
