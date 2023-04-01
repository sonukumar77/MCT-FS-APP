const UserModal = require("../Modal/User");
const jwt = require("jsonwebtoken");

class DataValidation {
  async checkAllRegistartionData(req, res, next) {
    const { name, email, password, phone, gender, city } = req.body;
    if (!name || !email || !password || !phone || !gender || !city) {
      res.status(400).send({ message: "All fields are required!" });
      return;
    }

    next();
  }

  async checkAllLoginData(req, res, next) {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required!" });
      return;
    } else if (!password) {
      res.status(400).send({ message: "Password is required!" });
      return;
    }

    next();
  }

  async checkEmailValidation(req, res, next) {
    const { email } = req.body;

    try {
      const isEmail = await UserModal.findOne({ email });
      if (isEmail) {
        res.status(400).send({ message: "user already exist" });
        return;
      }

      next();
    } catch (error) {
      res.status(500).send({ message: "Try again later" });
    }
  }

  async checkEmailAndPasswordValidation(req, res, next) {
    const { email, password } = req.body;

    try {
      const isUser = await UserModal.findOne({ email });
      if (!isUser) {
        res
          .status(400)
          .send({ message: "user is not registered with this email!" });
        return;
      }

      if (isUser.password === password) {
        next();
      } else {
        res.status(400).send({ message: "Wrong password!" });
        return;
      }
    } catch (error) {
      res.status(500).send({ message: "Try again later" });
      return;
    }
  }

  async checkAccessTokenValidation(req, res, next) {
    const { accessTokenCookie } = req.cookies;

    if (!accessTokenCookie) {
      res.status(400).send({ message: "You are not signed in!" });
      return;
    }

    const validateToken = jwt.verify(accessTokenCookie, process.env.SALT);
    if (!validateToken) {
      res.status(400).send({ message: "Unauthorised User!" });
      return;
    }

    next();
  }

  async checkEmailAndPasswordPresent(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(200).send({ message: "Email and password required!" });
      return;
    }

    next();
  }

  async checkNameEmailPhoneGenderCityPresent(req, res, next) {
    const { name, email, phone, gender, city } = req.body;
    if (!name || !phone || !gender || !city) {
      res.status(400).send({ message: "All fields are required!" });
      return;
    }

    next();
  }

  checkGenderPresent(req, res, next) {
    const gender = req.params.gender;
    if (!gender) {
      res.status(400).send({ message: "gender is required!" });
      return;
    }

    next();
  }

  async checkEmailPresent(req, res, next) {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required!" });
      return;
    }

    next();
  }
}

module.exports = new DataValidation();
