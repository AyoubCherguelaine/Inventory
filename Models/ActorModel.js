// DB.js

const {connection} = require('./db'); // Import your database connection here


class Actor{

  constructor(idActor=null,Name, Reference){
    
      this.idActor=idActor
      this.Name= Name
      this.Reference= Reference

    
  }

  async save(callback){
    Actor.create([this.Name,this.Reference],(Err,Result)=>{
      callback(err,Result)
    })
  }

  static async create(actorData, callback) {

    const query = 'INSERT INTO Actor (Name, Reference) VALUES (?, ?)';
    const { Name, Reference } = actorData;

    connection.query(query, [Name, Reference], (error, result) => {
      callback(error, result);
    });
}

  static async findById(actorId, callback) {
    const query = 'SELECT * FROM Actor WHERE idActor = ?';

    connection.query(query, [actorId], (error, result) => {
      callback(error, result);
    });
}

  static async findAll(callback) {
    const query = 'SELECT * FROM Actor';

    connection.query(query, (error, result) => {
      callback(error, result);
    });
}

  static async find(query, callback) {
    // Actor(idActor int ,Name text, Reference text)
    let q = 'SELECT * FROM Actor WHERE 1=1';

    const conditions = [];
    const values = [];

    if (query.hasOwnProperty('idActor')) {
      conditions.push('idActor = ?');
      values.push(query['idActor']);
    }
    if (query.hasOwnProperty('Name')) {
      conditions.push('Name LIKE ?');
      values.push(`%${query['Name']}%`);
    }
    if (query.hasOwnProperty('Reference')) {
      conditions.push('Reference LIKE ?');
      values.push(`%${query['Reference']}%`);
    }

    if (conditions.length > 0) {
      q += ' AND ' + conditions.join(' AND ');
    }

    connection.query(q, values, (err, result) => {
      callback(err, result);
    });
  }
}




module.exports = {
  Actor:Actor
};
