const Email = require("../models/emailModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllEmails = factory.getAll(Email);
exports.getEmail = factory.getOne(Email);
exports.updateEmail = factory.updateOne(Email);
exports.deleteEmail = factory.deleteOne(Email);

//Get user's company emails only
exports.getEmails = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)
  const docs = await Email.find({ company: req.user.company.id }).sort({
    date: -1
  });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs
  });
});

exports.createEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  try {
    const newEmail = new Email({
      email,
      user: req.user,
      company: req.user.company
    });
    const doc = await newEmail.save();

    res.status(200).json({
      status: "success",
      doc
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
