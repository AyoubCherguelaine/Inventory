// DB.js
const {connection} = require('./db'); // Import your database connection here

class ActorModel{

  async create(actorData, callback) {

    const query = 'INSERT INTO Actor (Name, Reference, LocalStock) VALUES (?, ?, ?)';
    const { Name, Reference, LocalStock } = actorData;

    connection.query(query, [Name, Reference, LocalStock], (error, result) => {
      callback(error, result);
    });
}

  async findById(actorId, callback) {
    const query = 'SELECT * FROM Actor WHERE idActor = ?';

    connection.query(query, [actorId], (error, result) => {
      callback(error, result);
    });
}

  async findAll(callback) {
    const query = 'SELECT * FROM Actor';

    connection.query(query, (error, result) => {
      callback(error, result);
    });
}
}




module.exports = {
    ActorModel:new ActorModel()
};
