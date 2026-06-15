import express from "express";
import Volunteer from "../models/Volunteer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();

    res.status(201).json({
      message: "Volunteer added successfully",
      data: newVolunteer
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding volunteer",
      error: error.message
    });
  }
});

// READ ALL
router.get("/", authMiddleware, async (req, res) => {
  try {
    const volunteers = await Volunteer.find();

    res.status(200).json({
      message: "All volunteers fetched successfully",
      data: volunteers
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching volunteers",
      error: error.message
    });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Volunteer.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting volunteer",
      error: error.message
    });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json({
      message: "Volunteer updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating volunteer",
      error: error.message
    });
  }
});

export default router;