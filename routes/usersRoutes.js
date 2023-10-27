const express = require('express');
const router = express.Router();

// Import the userController module
const userController = require('../controllers/ctlr_users');

// Define routes for managing users
router.route('/')
  .get(userController.getUser) // GET request to retrieve all users
  .post(userController.createUser); // POST request to create a new user

// Define routes for managing a single user by ID
router.route('/:userId')
  .get(userController.getSingleUser) // GET request to retrieve a single user by ID
  .put(userController.updateUser) // PUT request to update a user by ID
  .delete(userController.deleteUser); // DELETE request to delete a user by ID

// Define routes for managing a user's friends
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend) // POST request to add a friend to a user's friend list
  .delete(userController.deleteFriend); // DELETE request to remove a friend from a user's friend list

module.exports = router;
