const {ArticleModel,BaseArticleModel,DimensionModel} = require('../Models/ArticleModel');

class ArticleController {
  async createArticle(req, res,next) {
    try {
      const articleData = req.body;
      await ArticleModel.create(articleData,(result)=>{
        res.status(201).json(result);
      })
      // .then(article => {
      //   res.status(201).json(article);
      // })
      // .catch(error => {
      //   next(error);
      // });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the article' });
    }
  }

  async getArticle(req, res,next) {
    try {
      const articleId = parseInt(req.params.id);
      await ArticleModel.findById(articleId,(result)=>{
        if (!result) {
          return res.status(404).json({ message: 'Article not found' });
        }
        res.json(result);
      })

      // .then(article => {
      //   if (!article) {
      //     return res.status(404).json({ message: 'Article not found' });
      //   }
      //   res.json(article);
      // })
      // .catch(error => {
      //   next(error);
      // });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the article' });
    }
  }

  async getAllArticles(req, res,next) {
    console.log("test")
    try {
      await ArticleModel.findAll((result)=>{
        res.json(result);
    })
    // .then(articles => {
    //   res.json(articles);
    // })
    // .catch(error => {
    //   next(error);
    // });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred while fetching articles' });
    }
  }

  // You can add more controller methods for updating and deleting articles as needed
}

class BaseArticleController {
  async createBaseArticle(req, res) {
    try {
      const newBaseArticle = req.body;
      await BaseArticleModel.create(newBaseArticle,(result)=>{
        res.status(201).json(result);
      })
      // .then(article => {
      //   res.status(201).json(article);
      // })
      // .catch(error => {
      //   next(error);
      // });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the article' });
    }
  }

  async getBaseArticle(req, res) {
    try {
      const BasearticleId = parseInt(req.params.id);
      await BaseArticleModel.findById(BasearticleId,(result)=>{
        if (!result) {
          return res.status(404).json({ message: 'BaseArticle not found' });
        }
        res.json(result);
      })
      // .then(article => {
      //   if (!article) {
      //     return res.status(404).json({ message: 'Article not found' });
      //   }
      //   res.json(article);
      // })
      // .catch(error => {
      //   next(error);
      // });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Basearticle' });
    }
  }

  async getAllBaseArticles(req, res) {
    try {
      await BaseArticleModel.findAll((result)=>{
        res.json(result);
    })
    // .then(articles => {
    //   res.json(articles);
    // })
    // .catch(error => {
    //   next(error);
    // });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error occurred while fetching Basearticles' });
    }
  }

  // You can add more controller methods for updating and deleting articles as needed
}

class DimensionController {
  async createDimension(req, res) {
    try {
      const newDimension = req.body;
      await DimensionModel.create(newDimension,(result)=>{
        res.status(201).json(result);
      })
   
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the Dimension' });
    }
  }

  async getDimension(req, res) {
    try {
      const DimensionId = parseInt(req.params.id);
      await DimensionModel.findById(DimensionId,(result)=>{
        if (!result) {
          return res.status(404).json({ message: 'Dimension not found' });
        }
        res.json(result);
      })
      // if (Dimension) {
      //   res.json(Dimension);
      // } else {
      //   res.status(404).json({ message: 'Dimension not found' });
      // }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Dimension' });
    }
  }

  async getAllDimensions(req, res) {
    try {
      await DimensionModel.findAll((result)=>{
        res.json(result);
    })
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Dimensions' });
    }
  }

  // You can add more controller methods for updating and deleting articles as needed
}


module.exports = { ArticleController:new ArticleController(),
  BaseArticleController:new BaseArticleController(),
  DimensionController:new DimensionController()}
