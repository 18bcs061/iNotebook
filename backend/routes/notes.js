const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
////get all notes end point using get/////////////////////////////////////////////////////////////////////
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("intrenal error");
  }
});

///////////add notes end point using post////////////////////////////////////////////////////////////////////
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "decsription must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const [title, description, tag] = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenotes = notes.save();
      res.json(savenotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("intrenal error");
    }
  }
);
////////////////update notes end point using post/////////////////////////////////////////////////////////////////////
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  ////////////create new object//////////////
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    ////////////////find a note to be updated and update/////////////
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("intrenal error");
  }
});
//////////////////////////////////delete a notes end point ///////////////////////////////////////////////////////////////
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  ////////////////find a note to be deleted and delete it/////////////
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has benn deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("intrenal error");
  }
});
module.exports = router;
