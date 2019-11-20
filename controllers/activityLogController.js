const ActivityLog = require("../models/activityLogModel");
const factory = require("./handlerFactory");

const sendEmail = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createActivityLog = catchAsync(async (req, res, next) => {
  const { activity, subActivity, operateEmail, priority } = req.body;
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
    <li>${subActivity}: ${operateEmail ? operateEmail : ""}</li>
  </ul>`;

  const senderOutput = `
  <p>Your new support request has been sent successfully. It will be addressed within 2 working hours.</p>
  <h3><u>Requesting Party</u></h3>
  <ul>  
    <li>Priority: ${priority}</li>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>Company: ${req.user.company.companyName}</li>
  </ul>
  <h3><u>Requested Activity:</u></h3>
  <p>${activity}</p>
  <ul>
    <li>${subActivity}: ${operateEmail ? operateEmail : ""}</li>
  </ul>`;

  try {
    // const doc = await ActivityLog.create(req.body);
    let maillist = ["zeeshan@globuslabs.com"];
    const newActivityLog = new ActivityLog({
      activity,
      subActivity,
      name: req.user.name,
      company: req.user.company.id,
      email: req.user.email,
      operateEmail,
      priority,
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

//Get user's logs only
exports.getActivityLogs = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    ActivityLog.find({ user: req.user.id }),
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

//Get user's logs open status count
exports.getOpenStatusCount = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)
  const docs = await ActivityLog.find({
    user: req.user.id,
    openStatus: true
  }).countDocuments();

  res.status(200).json({
    status: "success",
    data: docs
  });
});

//Get user's logs with open status
exports.getOpenStatus = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)
  const docs = await ActivityLog.find({
    user: req.user.id,
    openStatus: true
  });

  res.status(200).json({
    status: "success",
    data: docs
  });
});

//Get user's 30 days logs only
exports.get30daysActivityLogs = catchAsync(async (req, res, next) => {
  const numberOfDaysToLookBack = 30;

  const features = await new APIFeatures(
    ActivityLog.find({
      user: req.user.id,
      date: {
        $gte: new Date(
          new Date().getTime() - numberOfDaysToLookBack * 24 * 60 * 60 * 1000
        )
      }
    }),
    req.query
  )
    .sort({
      date: -1
    })
    .paginate();

  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs
  });
});

//Get user's 30 days logs Count
exports.get30daysActivityLogsCount = catchAsync(async (req, res, next) => {
  const numberOfDaysToLookBack = 30;

  const docs = await ActivityLog.find({
    user: req.user.id,
    date: {
      $gte: new Date(
        new Date().getTime() - numberOfDaysToLookBack * 24 * 60 * 60 * 1000
      )
    }
  }).countDocuments();

  res.status(200).json({
    status: "success",

    data: docs
  });
});

//==============================================COMPANY====================================================//
//Get company's logs only
exports.getCompanyActivityLogs = catchAsync(async (req, res, next) => {
  const features = await new APIFeatures(
    ActivityLog.find({ company: req.user.company.id }),
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

//Get company's logs open status count
exports.getCompanyOpenStatusCount = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)
  const docs = await ActivityLog.find({
    company: req.user.company.id,
    openStatus: true
  }).countDocuments();

  res.status(200).json({
    status: "success",
    data: docs
  });
});

//Get user's logs with open status
exports.getCompanyOpenStatus = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)
  const docs = await ActivityLog.find({
    company: req.user.company.id,
    openStatus: true
  });

  res.status(200).json({
    status: "success",
    data: docs
  });
});

//Get user's 30 days logs only
exports.getCompany30daysActivityLogs = catchAsync(async (req, res, next) => {
  const numberOfDaysToLookBack = 30;

  const features = await new APIFeatures(
    ActivityLog.find({
      company: req.user.company.id,
      date: {
        $gte: new Date(
          new Date().getTime() - numberOfDaysToLookBack * 24 * 60 * 60 * 1000
        )
      }
    }),
    req.query
  )
    .sort({
      date: -1
    })
    .paginate();

  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs
  });
});

//Get user's 30 days logs Count
exports.getCompany30daysActivityLogsCount = catchAsync(
  async (req, res, next) => {
    const numberOfDaysToLookBack = 30;

    const docs = await ActivityLog.find({
      company: req.user.company.id,
      date: {
        $gte: new Date(
          new Date().getTime() - numberOfDaysToLookBack * 24 * 60 * 60 * 1000
        )
      }
    }).countDocuments();

    res.status(200).json({
      status: "success",

      data: docs
    });
  }
);
//==============================================COMPANY END====================================================//

//Get all logs for admin
exports.getAllActivityLogs = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)

  const features = new APIFeatures(ActivityLog.find(), req.query)
    .sort({
      date: -1
    })
    .paginate();
  const docs = await features.query;
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs
  });
});

exports.getActivityLog = factory.getOne(ActivityLog);
exports.updateActivityLog = factory.updateOne(ActivityLog);
exports.deleteActivityLog = factory.deleteOne(ActivityLog);
