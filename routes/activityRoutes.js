const express = require("express");
const authController = require("./../controllers/authController");
const activityController = require("./../controllers/activityController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("super-admin", "user", "admin"));

router
  .route("/")
  .get(activityController.getAllActivities)
  .post(activityController.createActivity);

router.route("/companyActivities").get(activityController.getCompanyActivities);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("super-admin"));
router
  .route("/:id")
  .get(activityController.getActivity)
  .patch(activityController.updateActivity)
  .delete(
    authController.restrictTo("super-admin"),
    activityController.deleteActivity
  );

module.exports = router;
