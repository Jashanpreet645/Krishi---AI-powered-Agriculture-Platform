import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Enter atleast 3 characters"],
    maxLength: [30, "Unable to enter more than 30 character"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Enter atleast 3 characters"],
    maxLength: [30, "Unable to enter more than 30 character"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Enter a Valid Email id"],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minLength: [10, "User must enter 10 digit number only!"],
    maxLength: [10, "User must enter 10 digit number only!"],
  },
  location: {
    type: String,
    required: true,
    minLength: [5, "Provide location information of the user"],
  },
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
