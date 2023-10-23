// Imports
const { Schema, model, Types } = require('mongoose');


// Reaction schema
const reactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
        type: String,
        required: true,
        maxlength: 280
       },
       username: {
        type: String,
        required: true,
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
          return new Date(createdAt).toISOString();
        }
       },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// Thought schema
const thoughtSchema = new Schema (
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
          return new Date(createdAt).toISOString();
        }
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)


// Get total count 
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// Create the Thought model using the thoughtSchema
const Thought = model('thought', thoughtSchema);

// Exports the Thought model
module.exports = Thought;