const UserModal = require("../Modal/User");
const jwt = require("jsonwebtoken");

class UserAuthController {
  async registerUser(req, res) {
    const { name, email, password, phone, gender, city } = req.body;
    try {
      const newUser = await UserModal.create({
        name,
        email,
        password,
        phone,
        gender,
        city,
      });
      res
        .status(200)
        .send({ message: "New user registration success", newUser });
      return;
    } catch (error) {
      res.status(500).send({ message: "registration failed" });
      return;
    }
  }

  async LoginUser(req, res) {
    const { email, password } = req.body;
    try {
      const userData = await UserModal.findOne({ email, password });
      const accessToken = jwt.sign({ _id: userData._id }, process.env.SALT, {
        expiresIn: "24h",
      });

      res.cookie("accessTokenCookie", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).send({
        message: "Login success",
        userData,
        access_token: accessToken,
      });
      return;
    } catch (error) {
      res.status(500).send({ message: "try again later" });
      return;
    }
  }

  LogoutUser(req, res) {
    res.clearCookie("accessTokenCookie");
    res.status(200).send({ message: "logout done!" });
    return;
  }
}

module.exports = new UserAuthController();
