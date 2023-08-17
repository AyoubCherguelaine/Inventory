const express = require('express');
const {ArticleController} = require('../Controllers/ArticleController');

const router = express.Router();

// Create a new article
router.post('/', ArticleController.createArticle);

// Get a specific article by ID
router.get('/:id', ArticleController.getArticle);

// Get all articles
router.get('/', ArticleController.getAllArticles);


// Define more routes for updating and deleting articles

module.exports = router;
