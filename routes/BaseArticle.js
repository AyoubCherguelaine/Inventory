const express = require('express');
const {BaseArticleController} = require('../Controllers/ArticleController');

const router = express.Router();


// Create a new article
router.post('/', BaseArticleController.createArticle);

// Get a specific article by ID
router.get('/:id', BaseArticleController.getArticle);

// Get all articles
router.get('/', BaseArticleController.getAllArticles);


// Define more routes for updating and deleting articles

module.exports = router;

