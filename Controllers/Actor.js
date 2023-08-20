const {Actor} = require('../Models/ActorModel');

class ActorController {
    
  async createActor(req, res) {
    try {
      const newActor = req.body;
      await Actor.create(newActor,(err,result)=>{
        if(err) res.status(500).json(err)
        else{
          res.status(201).json(result);
        }
      });
     
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the Actor' });
    }
  }

  async getActor(req, res) {
    try {
      const ActorId = parseInt(req.params.id);
      await Actor.findById(ActorId,(err,result)=>{
        if(err) res.status(500).json(err)
        else{
          let Actor = result[0]
          if (Actor) {
            res.json(Actor);
          } else {
            res.status(404).json({ message: 'Actor not found' });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the Actor' });
    }
  }

  async getAllActors(req, res) {
    try {
        await Actor.findAll((err,result)=>{
        if(err) res.status(500).json(err)
        else{
          res.status(201).json(result);
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching Actors' });
    }
  }

  // You can add more controller methods for updating and deleting Actors as needed
}

module.exports= {
  ActorController:new ActorController()
}