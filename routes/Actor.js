const express = require('express');
const {ActorController} = require('../Controllers/Actor');


const router = express.Router();

// Create a new Actor
router.post('/', ActorController.createActor);

// Get a specific Actor by ID
router.get('/:id', ActorController.getActor);

// Get all Actors
router.get('/', ActorController.getAllActors);


// Define more routes for updating and deleting Actors

module.exports = router;
