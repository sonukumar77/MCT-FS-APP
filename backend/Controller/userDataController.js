const UserModal = require("../Modal/User");
const jwt = require("jsonwebtoken");

class UserDataController {
  async deleteUserAccount(req, res) {
    const { email, password } = req.body;
    try {
      const userData = await UserModal.deleteOne({ email, password });
      if (userData.deletedCount != 1) {
        res.status(400).send({ message: "Please Provide valid data!" });
        return;
      }

      res.clearCookie("accessTokenCookie");
      res.status(200).send({ message: "Account deleted successfully!" });
      return;
    } catch (error) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }

  async updateUserProfile(req, res) {
    const { name, email, phone, gender, city } = req.body;
    try {
      let userData = await UserModal.findOne({ email });

      if (!userData) {
        res.status(400).send({ message: "Please provide valid data!" });
        return;
      }

      userData.name = name;
      userData.phone = phone;
      userData.gender = gender;
      userData.city = city;

      userData = await userData.save();
      res
        .status(200)
        .send({ message: "User profile updated successfully", userData });
      return;
    } catch (error) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }

  async getUserDataByGender(req, res) {
    const gender = req.params.gender;

    try {
      let users;
      if(gender === "all"){
        users = await UserModal.find();
      }else{
        users = await UserModal.find({ gender });
      }
     
      if (!users) {
        res.status(400).send({ message: "No data Available!", users: null });
        return;
      }
      res.status(200).send({ message: "Data found!", users: users });
      return;
    } catch (err) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }

  async getUserDataByEmail(req, res) {
    const { email } = req.body;

    try {
      const user = await UserModal.findOne({ email });
      if (!user) {
        res
          .status(400)
          .send({
            message: "No data available with this email id!",
            user: null,
          });
        return;
      } else {
        res.status(200).send({ message: "Data found!", user: user });
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }
}

module.exports = new UserDataController();
