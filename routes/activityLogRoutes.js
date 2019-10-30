const express = require("express");
const authController = require("./../controllers/authController");
const activityLogController = require("./../controllers/activityLogController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(activityLogController.getAllActivityLogs)
  .post(activityLogController.createActivityLog);

router
  .route("/:id")
  .get(activityLogController.getActivityLog)
  .patch(
    authController.restrictTo("admin"),
    activityLogController.updateActivityLog
  )
  .delete(
    authController.restrictTo("admin"),
    activityLogController.deleteActivityLog
  );

module.exports = router;
