const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please enter company name!"],
    unique: true
  },
  shortName: {
    type: String
  },
  country: {
    type: String,
    required: [true, "Please enter company's country!"]
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  companyAddress: {
    type: String
  },
  companyPhone: {
    type: String
  },
  companyEmail: {
    type: String,
    unique: [true, "This email already Exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
    required: false
  },
  contactPerson: {
    type: String
  },
  contactPersonPhone: {
    type: String
  },
  contactPersonEmail: {
    type: String,
    unique: [true, "This email already Exists"],
    lowercase: true,

    required: false
  },
  photo: String,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

companySchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Company = mongoose.model("Company", companySchema);
