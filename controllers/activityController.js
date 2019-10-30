const Activity = require("../models/activityModel");
const factory = require("./handlerFactory");

exports.createActivity = factory.createOne(Activity);
exports.getAllActivities = factory.getAll(Activity);
exports.getActivity = factory.getOne(Activity);
exports.updateActivity = factory.updateOne(Activity);
exports.deleteActivity = factory.deleteOne(Activity);
