const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const DeadStock = require("../Models/DeadStock");
const fetchuser = require("../Middlewares/fetchuser");


router.get("/fetchalldeadstocks", fetchuser, async (req, res) => {
    try {
      const stock = await  DeadStock.find({ user: req.user.id });
      res.json(stock);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post(
    "/adddeadstock",
    fetchuser,
    [body("isbn").isLength({ min: 10 })],
    async (req, res) => {
      try {
        const {
          stock_id,
          stock_name,
          date_of_importing,
          no_of_units,
          isbn
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new DeadStock({
          stock_id,
          stock_name,
          date_of_importing,
          // date_of_exporting,
          no_of_units,
          isbn,
          // expired,
          user: req.user.id,
        });
        const saveNote = await note.save();
        res.json(saveNote);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  
  module.exports = router;

