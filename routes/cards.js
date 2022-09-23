const express = require("express");
const joi = require("joi");
const router = express.Router();
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const User = require("../models/User");
const _ = require("lodash");

const cardSchema = joi.object({
  bizName: joi.string().required().min(2),
  bizDescription: joi.string().required().min(2).max(1024),
  bizAddress: joi.string().required().min(2),
  bizPhone: joi.string().required().min(9).max(10),  
  bizImage: joi.string().required(),
  });
  
  //4: add business card
router.post("/", auth, async (req, res) => {
    try {
// joi validation
  const { error } = cardSchema.validate(req.body);
 if (error) return res.status(400).send(error.message);
  
// add new card
let card = new Card(req.body);

// Random number for each card
let flage = true;
while(flage){
  // random number
    let randomNumber =_.random(1, 999999);
// check a unique random number
let checkUniqueNumber = await Card.findOne({ bizNumber: randomNumber });
if (!checkUniqueNumber) flage=false;
card.bizNumber=randomNumber;
card.user_id=req.payload._id;
}
// save card 
await card.save();
res.status(201).send(card); 

    } catch (error) {
      res.status(400).send("There is a mistake in card" + error);
    }
  });

  //   9-  Get all cards  
router.get("/all", auth, async (req, res) => {
  try {
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send("Error in card" + error);
  }
});
  
  //  8- Array of all business cards of a user.
  // check /:myCards first and then /:id 
router.get("/:myCards", auth, async (req, res) => {
  try {
     // find(): return an array 
    let cards = await Card.find({user_id:req.payload._id});
    res.status(200).send(cards);
  } catch (error) {
     res.status(400).send("Error in card"+error);
  }
});

// 5 -Full details of a business card
router.get("/:id", auth, async (req, res) => {
    try {
        let card = await Card.find();
        res.status(200).send(card);
 }   catch (error) {
      return res.status(400).send(error);
    }
  });
  
//  6-  update card
router.put("/:id", auth, async (req, res) => {
    try {
     // joi validation
      const { error } = cardSchema.validate(req.body);
      if (error) return res.status(400).send(error.message);
  
      // update in db
      let card = await Card.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!card) return res.status(404).send("No such card");
      res.status(200).send(card);
    } catch (error) {
      res.status(400).send(error);
    }
  });

//   7 - delete card
router.delete("/:id", auth, async (req, res) => {
    try {
      let card = await Card.findByIdAndRemove(req.params.id);
      // 404 not found
      if (!card) return res.status(404).send("No such card");
      res.status(200).send("card removed successfully!");
    } catch (error) {
      res.status(400).send("Error in deleting card"+error);
    }
  });
   
module.exports = router;
