import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    availability: {
      type: String,
      enum: ["Weekdays", "Weekends", "Flexible"],
      default: "Flexible"
    }
  },
  {
    timestamps: true
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;