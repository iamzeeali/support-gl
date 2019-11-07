const ActivityLog = require("../models/activityLogModel");
const factory = require("./handlerFactory");

const sendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createActivityLog = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const { activity, subActivity } = req.body;
  const { name, email } = req.user;

  const receiverOutput = `
    <h3><u>Requesting Party:</u></h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
      <li>Company: ${req.user.company.companyName}</li>
    </ul>
    <h3><u>Requested Activity:</u></h3>
    <p>${activity}</p>
  <ul>
    <li>${subActivity}</li>
  </ul>`;

  const senderOutput = `
  <p>Your new support request has been sent successfully. It will be addressed within 2 working hours.</p>
  <h3><u>Requesting Party</u></h3>
  <ul>  
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>Company: ${req.user.company.companyName}</li>
  </ul>
  <h3><u>Requested Activity:</u></h3>
  <p>${activity}</p>
  <ul>
    <li>${subActivity}</li>
  </ul>`;

  try {
    // const doc = await ActivityLog.create(req.body);
    let maillist = ["zeeshan@globuslabs.com"];
    console.log(req.user);
    const newActivityLog = new ActivityLog({
      activity,
      subActivity,
      name: req.user.name,
      company: req.user.company.companyName,
      email: req.user.email,
      user: req.user.id
    });
    const doc = await newActivityLog.save();

    await sendEmail({
      to: maillist,
      bcc: "mdzeeshanali93@gmail.com",
      subject: `New Activity- ${req.user.company.companyName}`,
      output: receiverOutput
    });
    await sendEmail({
      to: email,
      bcc: "mdzeeshanali93@gmail.com",
      subject: `Globus Labs support for- ${req.user.company.companyName}`,
      output: senderOutput
    });
    res.status(200).json({
      status: "success",
      data: doc,
      message: "Email sent successfully!"
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError("There was an error sending email. Try again later!"),
      500
    );
  }
});
exports.getAllActivityLogs = factory.getAll(ActivityLog);
exports.getActivityLog = factory.getOne(ActivityLog);
exports.updateActivityLog = factory.updateOne(ActivityLog);
exports.deleteActivityLog = factory.deleteOne(ActivityLog);
