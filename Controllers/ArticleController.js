const {ArticleModel,BaseArticleModel,DimensionModel} = require('../Models/ArticleModel');

class ArticleController {
  async createArticle(req, res) {
    try {
      const newArticle = req.body;
      const createdArticle = await ArticleModel.create(newArticle);
      res.status(201).json(createdArticle);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the article' });
    }
  }

  async getArticle(req, res) {
    try {
      const articleId = parseInt(req.params.id);
      const article = await ArticleModel.findById(articleId);
      if (article) {
        res.json(article);
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the article' });
    }
  }

  async getAllArticles(req, res) {
    try {
      const articles = await ArticleModel.findAll();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching articles' });
    }
  }

  // You can add more controller methods for updating and deleting articles as needed
}

class BaseArticleController {
  async createBaseArticle(req, res) {
    try {
      const newBaseArticle = req.body;
      const createdBaseArticle = await BaseArticleModel.create(newBaseArticle);
      res.status(201).json(createdBaseArticle);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the article' });
    }
  }

  async getBaseArticle(req, res) {
    try {
      const BasearticleId = parseInt(req.params.id);
      const Basearticle = await BaseArticleModel.findById(BasearticleId);
      if (Basearticle) {
        res.json(Basearticle);
      } else {
        res.status(404).json({ message: 'BaseArticle not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Basearticle' });
    }
  }

  async getAllBaseArticles(req, res) {
    try {
      const Basearticles = await BaseArticleModel.findAll();
      res.json(Basearticles);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Basearticles' });
    }
  }

  // You can add more controller methods for updating and deleting articles as needed
}

class DimensionController {
  async createDimension(req, res) {
    try {
      const newDimension = req.body;
      const createdDimension = await DimensionModel.create(newArticle);
      res.status(201).json(createdDimension);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the Dimension' });
    }
  }

  async getDimension(req, res) {
    try {
      const DimensionId = parseInt(req.params.id);
      const Dimension = await DimensionModel.findById(DimensionId);
      if (Dimension) {
        res.json(Dimension);
      } else {
        res.status(404).json({ message: 'Dimension not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Dimension' });
    }
  }

  async getAllDimensions(req, res) {
    try {
      const Dimensions = await DimensionModel.findAll();
      res.json(Dimensions);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Dimensions' });
    }
  }

  // You can add more controller methods for updating and deleting articles as needed
}


module.exports = { ArticleController:ArticleController(),
  BaseArticleController:BaseArticleController(),
  DimensionController:DimensionController()}
