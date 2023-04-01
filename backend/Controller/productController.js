const ProductModel = require("../Modal/Product");

class ProductController {
  async getProductByElectronicscategory(req, res) {
    

    try {
      const products = await ProductModel.find({ category:"electronics" });
      if (!products) {
        res
          .status(400)
          .send({ message: "Products not found!", products: null });
        return;
      }

      res.status(200).send({ message: "Products found!", products });
      return;
    } catch (error) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }
  async getProductByJewelerycategory(req, res) {
    

    try {
      const products = await ProductModel.find({ category:"jewelery" });
      if (!products) {
        res
          .status(400)
          .send({ message: "Products not found!", products: null });
        return;
      }

      res.status(200).send({ message: "Products found!", products });
      return;
    } catch (error) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }
  async getProductByMensclothingcategory(req, res) {
    

    try {
      const products = await ProductModel.find({ category:"men's clothing" });
      if (!products) {
        res
          .status(400)
          .send({ message: "Products not found!", products: null });
        return;
      }

      res.status(200).send({ message: "Products found!", products });
      return;
    } catch (error) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }
  async getProductByWomensclothingcategory(req, res) {
    

    try {
      const products = await ProductModel.find({ category:"women's clothing" });
      if (!products) {
        res
          .status(400)
          .send({ message: "Products not found!", products: null });
        return;
      }

      res.status(200).send({ message: "Products found!", products });
      return;
    } catch (error) {
      res.status(500).send({ message: "Try again later!" });
      return;
    }
  }






}

module.exports = new ProductController();
