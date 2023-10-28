// Imports User from models
const User = require('../models/users');

// Get all users from mongoDB
const userController = {
  async getUser(req, res) {
    try {
      const users = await User.find()
//wait User.find() to fetch user data from a MongoDB database. This will use User and pull friends and thoughts usimg the users model
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
//populate fields with user info excluding the mongoDB versioning
//you also need to use populate to resolve the relationship between User and Thought because without this method you would only get the objectids
      return res.status(200).json(users);
    } catch (err) {
      return res.status(503).json(err);
      console.log(err); // Log the error before sending the response   
    }
  },

  // Get a single user using
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
        if (!user) {
        return res.status(404).json({ message: "ID/User not found, please use a valid ID" });
      }
      return res.status(200).json(user);
        } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },
  
  // Create a new user
  async createUser(req, res) {
    console.log("Request to create new user"); // Add this line
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, //as seen in class
        { $set: req.body },//passed from the front end or from postman
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "ID/User not found, please use a valid ID" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  //Delete a user by using the userID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "ID/User not found, please use a valid ID" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  
  // Add a friend to a user using the userID
  async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "ID/User not found, please use a valid ID" });
      }
      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  // Delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res.status(404).json({ message: "ID:User/Friend not found, please use a valid ID" });
      }
      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },
};

// Export 
module.exports = userController;