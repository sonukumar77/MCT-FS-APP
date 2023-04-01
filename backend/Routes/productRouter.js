const router = require("express").Router();
const ProductMiddleware = require("../Middleware/checkProductDataValidation");
const ProductController = require("../Controller/productController");
const ProductModel = require("../Modal/Product");

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ message: "Id is required!" });
    return;
  }

  try {
    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      res.status(400).send({ message: "No data Available!", data: null });
      return;
    }
    res.status(200).send({ message: "Data found!", product });
    return;
  } catch (err) {
    res.status(500).send({ message: "Try again later!" });
    return;
  }
});

router.get(
  "/category/electronics",
  ProductController.getProductByElectronicscategory
);
router.get(
  "/category/jewellery",
  ProductController.getProductByJewelerycategory
);
router.get(
  "/category/mensClothing",
  ProductController.getProductByMensclothingcategory
);
router.get(
  "/category/womensClothing",
  ProductController.getProductByWomensclothingcategory
);

module.exports = router;
