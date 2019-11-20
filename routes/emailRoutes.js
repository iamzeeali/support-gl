const express = require("express");
const authController = require("./../controllers/authController");
const emailController = require("./../controllers/emailController");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("super-admin", "user", "admin"));

router
  .route("/")
  .get(emailController.getEmails)
  .post(emailController.createEmail);

router
  .route("/all")
  .get(authController.restrictTo("super-admin"), emailController.getAllEmails);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("super-admin", "user", "admin"));
router
  .route("/:id")
  .get(emailController.getEmail)
  .patch(emailController.updateEmail)
  .delete(
    authController.restrictTo("super-admin"),
    emailController.deleteEmail
  );

module.exports = router;
