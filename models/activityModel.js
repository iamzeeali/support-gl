const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company",
    required: [true, "Please enter a company"]
  },
  activityName: {
    type: String,
    required: [true, "Please enter an activity name"],
    unique: true
  },
  subActivities: {
    type: [String]
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

activitySchema.pre(/^find/, function(next) {
  this.populate({
    path: "company",
    select: "name"
  });

  next();
});

activitySchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Activity = mongoose.model("Activity", activitySchema);
