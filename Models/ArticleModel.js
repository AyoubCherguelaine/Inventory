const pool = require("./db"); // Assuming you have a database connection module

class ArticleModel {
  async create(articleData) {
    try {
      const query = 'INSERT INTO Article (SalePrice, Cost, Reference, BarCode, idBaseArticle, idDimension) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [
        articleData.SalePrice,
        articleData.Cost,
        articleData.Reference,
        articleData.BarCode,
        articleData.idBaseArticle,
        articleData.idDimension
      ];

      const [result] = await pool.query(query, values);
      return { id: result.insertId, ...articleData };
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const query = 'SELECT * FROM Article WHERE idArticle = ?';
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const query = 'SELECT * FROM Article';
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // You can add more methods for updating and deleting articles as needed
}


class BaseArticleModel {
  async create(BaseArticleData) {
    try {
      const query = 'INSERT INTO BaseArticle (Name) VALUES (?)';
      const values = [
        BaseArticleData.Name
      ];

      const [result] = await pool.query(query, values);
      return { id: result.insertId, ...BaseArticleData };
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const query = 'SELECT * FROM BaseArticle WHERE idBaseArticle = ?';
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const query = 'SELECT * FROM BaseArticle';
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // You can add more methods for updating and deleting articles as needed
}


class DimensionModel {
  async create(DimensionData) {
    try {
      const query = 'INSERT INTO Dimension (description,Title) VALUES (?)';
      const values = [
        DimensionData.description,
        DimensionData.Title
      ];

      const [result] = await pool.query(query, values);
      return { id: result.insertId, ...DimensionData };
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const query = 'SELECT * FROM Dimension WHERE idDimension = ?';
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const query = 'SELECT * FROM Dimension';
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // You can add more methods for updating and deleting articles as needed
}


module.exports = {ArticleModel: ArticleModel(),
                  BaseArticleModel: BaseArticleModel(),
                  DimensionModel:DimensionModel()}
