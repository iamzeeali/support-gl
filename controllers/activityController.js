const Activity = require("../models/activityModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

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

//Get Company's activities only
exports.getCompanyActivities = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    Activity.find({ company: req.user.company.id }),
    req.query
  )
    .sort()
    .paginate();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs
  });
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
