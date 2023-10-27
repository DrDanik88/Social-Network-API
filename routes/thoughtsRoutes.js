// Imports the Express Router
const router = require('express').Router();

// Import the thoughtsController module
const thoughtsCtlr = require('../controllers/ctlr_thoughts');


// Define routes for managing thoughts

// Route for retrieving all thoughts and creating a new thought
router.route('/')
  .get(thoughtsCtlr.getThought)     // GET request to retrieve all thoughts
  .post(thoughtsCtlr.createThought); // POST request to create a new thought

// Route for managing a single thought by ID
router.route('/:thoughtId')
  .get(thoughtsCtlr.getSingleThought) // GET request to retrieve a single thought by ID
  .put(thoughtsCtlr.updateThought)    // PUT request to update a thought by ID
  .delete(thoughtsCtlr.deleteThought); // DELETE request to delete a thought by ID

// Route for managing reactions for a specific thought
router.route('/:thoughtId/reactions')
  .post(thoughtsCtlr.createReaction); // POST request to create a new reaction for a thought

// Route for deleting a specific reaction by ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtsCtlr.deleteReaction); // DELETE request to delete a reaction by ID

// Export the configured router
module.exports = router;
