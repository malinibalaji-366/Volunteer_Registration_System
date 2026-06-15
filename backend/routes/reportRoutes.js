import express from "express";
import { Parser } from "json2csv";
import Volunteer from "../models/Volunteer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
console.log("Report Routes Loaded");
const router = express.Router();

router.get("/csv", authMiddleware, async (req, res) => {
  try {
    const volunteers = await Volunteer.find().lean();

    const fields = [
      "name",
      "email",
      "phone",
      "age",
      "skills",
      "availability",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(volunteers);

    res.header("Content-Type", "text/csv");
    res.attachment("volunteers-report.csv");

    return res.send(csv);
  } catch (err) {
    res.status(500).json({
      message: "Error generating report",
      error: err.message,
    });
  }
});

export default router;