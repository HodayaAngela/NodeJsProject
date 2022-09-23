const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const _ = require("lodash");

// 3
router.get("/", auth, async (req, res) => {
    try {
      let user = await User.findById(req.payload._id);
      // status(404) not found
      if (!user) return res.status(404).send("Wrong details");
      // Get details without the password
      res.status(200).send(_.pick(user, ["_id", "name", "email", "biz"]));
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  

module.exports = router;