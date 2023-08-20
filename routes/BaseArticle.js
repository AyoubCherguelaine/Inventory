const express = require('express');
const {BaseArticleController} = require('../Controllers/Article');

const router = express.Router();


// Create a new article
router.post('/', BaseArticleController.createBaseArticle);

// Get a specific article by ID
router.get('/:id', BaseArticleController.getBaseArticle);

// Get all articles
router.get('/', BaseArticleController.getAllBaseArticles);


// Define more routes for updating and deleting articles

module.exports = router;

