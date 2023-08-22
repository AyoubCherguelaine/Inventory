const {connection} = require("./db"); // Assuming you have a database connection module



class Article {
  static async create(articleData,callback) {
    const query = `INSERT INTO Article (SalePrice, Cost, Reference, BarCode, idBaseArticle, idDimension) VALUES 
    (${articleData.SalePrice}, ${articleData.Cost}, ${articleData.Reference}, ${articleData.BarCode}, ${articleData.idBaseArticle}, ${articleData.idDimension})`;
   

    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  static async findById(id,callback) {
    const query = `SELECT * FROM Article WHERE idArticle = ${id}`;
    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result[0])
    })
  }

  static async findAll(callback) {
    const query = 'SELECT * FROM Article';
    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  
  }

    static async find(query, callback) {
      let q = 'SELECT * FROM Article WHERE 1=1';
    
      const conditions = [];
      const values = [];
    
      if (query.hasOwnProperty('SalePrice')) {
        conditions.push('SalePrice = ?');
        values.push(query['SalePrice']);
      }
      if (query.hasOwnProperty('Cost')) {
        conditions.push('Cost = ?');
        values.push(query['Cost']);
      }
      if (query.hasOwnProperty('Reference')) {
        conditions.push('Reference LIKE ?');
        values.push(`%${query['Reference']}%`);
      }
      if (query.hasOwnProperty('BarCode')) {
        conditions.push('BarCode LIKE ?');
        values.push(`%${query['BarCode']}%`);
      }
      if (query.hasOwnProperty('idBaseArticle')) {
        conditions.push('idBaseArticle = ?');
        values.push(query['idBaseArticle']);
      }
      if (query.hasOwnProperty('idDimension')) {
        conditions.push('idDimension = ?');
        values.push(query['idDimension']);
      }
    
      if (conditions.length > 0) {
        q += ' AND ' + conditions.join(' AND ');
      }
    
      connection.query(q, values, (err, result) => {
        callback(err, result);
      });
    }
}


class BaseArticle {
  static async create(BaseArticleData,callback) {
    const query = `INSERT INTO BaseArticle (Name) VALUES (${BaseArticleData.Name})`;
  

    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  static async findById(id,callback) {
    const query = `SELECT * FROM BaseArticle WHERE idBaseArticle = ${id}`;

    await connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result[0])
    })
  }

  static async findAll(callback) {
    const query = 'SELECT * FROM BaseArticle';
    await  connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  
  static async find(query, callback) {
    let q = 'SELECT * FROM BaseArticle WHERE 1=1';
  
    const conditions = [];
    const values = [];
  
    if (query.hasOwnProperty('idBaseArticle')) {
      conditions.push('idBaseArticle = ?');
      values.push(query['idBaseArticle']);
    }
    if (query.hasOwnProperty('Name')) {
      conditions.push('Name LIKE ?');
      values.push(`%${query['Name']}%`);
    }
  
    if (conditions.length > 0) {
      q += ' AND ' + conditions.join(' AND ');
    }
  
    connection.query(q, values, (err, result) => {
      callback(err, result);
    });
  }
  
}


class Dimension {
  static async create(DimensionData,callback) {
    const query = `INSERT INTO Dimension (description,Title) VALUES (${DimensionData.description},${ DimensionData.Title})`;
   

    await  connection.query(query, (err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }

  static async findById(id,callback) {
    const query = `SELECT * FROM Dimension WHERE idDimension = ${id}`;
    await  connection.query(query, (err,result)=>{
      if(err) throw err;
      else
      callback(result[0])
    })
  }

  static async findAll(callback) {
    const query = 'SELECT * FROM Dimension';
    await  connection.query(query,(err,result)=>{
      if(err) throw err;
      else
      callback(result)
    })
  }


  static async find(query, callback) {
    let q = 'SELECT * FROM Dimension WHERE 1=1';
  
    const conditions = [];
    const values = [];
  
    if (query.hasOwnProperty('idDimension')) {
      conditions.push('idDimension = ?');
      values.push(query['idDimension']);
    }
    if (query.hasOwnProperty('description')) {
      conditions.push('description LIKE ?');
      values.push(`%${query['description']}%`);
    }
    if (query.hasOwnProperty('Title')) {
      conditions.push('Title LIKE ?');
      values.push(`%${query['Title']}%`);
    }
  
    if (conditions.length > 0) {
      q += ' AND ' + conditions.join(' AND ');
    }
  
    connection.query(q, values, (err, result) => {
      callback(err, result);
    });
  }
}


module.exports = {ArticleModel: Article,
                  BaseArticleModel: BaseArticle,
                  DimensionModel: Dimension}
