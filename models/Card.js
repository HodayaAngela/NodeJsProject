// Template and validation using mongoose
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlength: 2,
  },
  bizDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength:1024
  },
  bizAddress: {
    type: String,
    required: true,
    minlength: 2
  },
  bizPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10
  },
  bizImage: {
    type: String,
    required: true
  },
// bizNumber only in mongoose, not required in body
  bizNumber: {
    type: Number,
    minlength: 1,
    maxlength: 99999999999,
    unique: true
  },
  //in the payload
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Card = mongoose.model("cards", cardSchema);

module.exports =Card;

