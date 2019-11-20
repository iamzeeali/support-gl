const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    ref: "Company"
  },
  activityName: {
    type: String,
    required: [true, "Please enter an activity name"]
  },
  subActivities: {
    type: [String]
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

activitySchema.pre(/^find/, function(next) {
  this.populate({
    path: "company",
    select: "companyName"
  });

  next();
});

activitySchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = Activity = mongoose.model("Activity", activitySchema);
