const CategoryModel = require("../Modal/Category");

class CategoryController {
  async getAllcategory(req, res) {

    try {
        const categories = await  CategoryModel.find();
        if (!categories) {
          res.status(400).send({ message: "No data Available!", data: null });
          return;
        }
        res.status(200).send({ message: "Data found!", categories });
        return;
      } catch (err) {
        res.status(500).send({ message: "Try again later!" });
        return;
      }

  }


}

module.exports = new CategoryController();
