// Imports User and Thought from models
const { User, Thought } = require("../models");

// Get all thoughts in db
const thoughtController = {
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "ID/Thought not found, please use a valid ID" });
      }
      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      return res.status(200).json({ thought, user });
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

 // Update an existing thought
 async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "ID/Thought not found, please use a valid ID" });
      }

      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

// Delete a Thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "ID/Thought not found, please use a valid ID" });
      }

      return res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },


  // Create reaction
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "ID/Though not found" });
      }

      return res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "Rection/Tought not found" });
      }

      return res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(503).json(err);
    }
  },
};

// Exports
module.exports = thoughtController;
