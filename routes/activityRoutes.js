const express = require("express");
const authController = require("./../controllers/authController");
const activityController = require("./../controllers/activityController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin", "user"));

router
  .route("/")
  .get(activityController.getAllActivities)
  .post(activityController.createActivity);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));
router
  .route("/:id")
  .get(activityController.getActivity)
  .patch(activityController.updateActivity)
  .delete(
    authController.restrictTo("admin"),
    activityController.deleteActivity
  );

module.exports = router;
