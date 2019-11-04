const Activity = require("../models/activityModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");

exports.createActivity = catchAsync(async (req, res, next) => {
  const { company, activityName, subActivities } = req.body;

  // Build profile object
  const activityFields = {};
  //   activityFields.user = req.user.id;

  if (company) activityFields.company = company;
  if (activityName) activityFields.activityName = activityName;
  if (subActivities) {
    activityFields.subActivities = subActivities
      .toString()
      .split(",")
      .map(subActivity => subActivity.trim());
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let activity = await Activity.create(activityFields);
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

exports.getAllActivities = factory.getAll(Activity);
exports.getActivity = factory.getOne(Activity);
exports.updateActivity = catchAsync(async (req, res, next) => {
  const { company, activityName, subActivities } = req.body;

  // Build profile object
  const activityFields = {};
  //   activityFields.user = req.user.id;

  if (company) activityFields.company = company;
  if (activityName) activityFields.activityName = activityName;
  if (subActivities) {
    activityFields.subActivities = subActivities
      .toString()
      .split(",")
      .map(subActivity => subActivity.trim());
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      activityFields,
      {
        new: true,
        runValidators: true
      }
    );
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
  next();
});

exports.deleteActivity = factory.deleteOne(Activity);
