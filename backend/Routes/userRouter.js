const express = require("express");
const router = express.Router();
const UserAuthController = require("../Controller/userAuthController");
const UserDataController = require("../Controller/userDataController");
const UserDataMiddleware = require("../Middleware/checkUserDataValidation");
const UserModal = require("../Modal/User");

router.post(
  "/register",
  UserDataMiddleware.checkAllRegistartionData,
  UserDataMiddleware.checkEmailValidation,
  UserAuthController.registerUser
);
router.post(
  "/login",
  UserDataMiddleware.checkAllLoginData,
  UserDataMiddleware.checkEmailAndPasswordValidation,
  UserAuthController.LoginUser
);
router.post(
  "/logout",
  UserDataMiddleware.checkAccessTokenValidation,
  UserAuthController.LogoutUser
);
router.post(
  "/delete",
  UserDataMiddleware.checkEmailAndPasswordPresent,
  UserDataController.deleteUserAccount
);
router.post(
  "/updateProfile",
  UserDataMiddleware.checkAccessTokenValidation,
  UserDataMiddleware.checkNameEmailPhoneGenderCityPresent,
  UserDataController.updateUserProfile
);

router.get(
  "/gender/:gender",
  UserDataMiddleware.checkGenderPresent,
  UserDataController.getUserDataByGender
);
router.get(
  "/email",
  UserDataMiddleware.checkEmailPresent,
  UserDataController.getUserDataByEmail
);

module.exports = router;
