const {connection} = require("./db"); // Assuming you have a database connection module

class ArticleModel {
  async create(articleData,callback) {
    const query = `INSERT INTO Article (SalePrice, Cost, Reference, BarCode, idBaseArticle, idDimension) VALUES 
    (${articleData.SalePrice}, ${articleData.Cost}, ${articleData.Reference}, ${articleData.BarCode}, ${articleData.idBaseArticle}, ${articleData.idDimension})`;
   

    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  async findById(id,callback) {
    const query = `SELECT * FROM Article WHERE idArticle = ${id}`;
    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result[0])
    })
  }

  async findAll(callback) {
    const query = 'SELECT * FROM Article';
    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  
  }


  // You can add more methods for updating and deleting articles as needed
}


class BaseArticleModel {
  async create(BaseArticleData,callback) {
    const query = `INSERT INTO BaseArticle (Name) VALUES (${BaseArticleData.Name})`;
  

    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  async findById(id,callback) {
    const query = `SELECT * FROM BaseArticle WHERE idBaseArticle = ${id}`;

    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result[0])
    })
  }

  async findAll(callback) {
    const query = 'SELECT * FROM BaseArticle';
    await  connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  

  // You can add more methods for updating and deleting articles as needed
}


class DimensionModel {
  async create(DimensionData,callback) {
    const query = `INSERT INTO Dimension (description,Title) VALUES (${DimensionData.description},${ DimensionData.Title})`;
   

    await  connection.query(query, (err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  async findById(id,callback) {
    const query = `SELECT * FROM Dimension WHERE idDimension = ${id}`;
    await  connection.query(query, (err,result)=>{
      if(err) throw err;
      else
      callback(result[0])
    })
  }

  async findAll(callback) {
    const query = 'SELECT * FROM Dimension';
    await  connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }


  // You can add more methods for updating and deleting articles as needed
}


module.exports = {ArticleModel:new ArticleModel(),
                  BaseArticleModel:new BaseArticleModel(),
                  DimensionModel:new DimensionModel()}
