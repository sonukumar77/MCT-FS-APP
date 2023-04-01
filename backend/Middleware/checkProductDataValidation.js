class ProductValidation {
  async checkCategoryPresent(req, res, next) {
    const { category } = req.body;
    if (!category) {
      res
        .status(400)
        .send({ message: "Please enter valid category!", products: null });
      return;
    }

    next();
  }
}

module.exports = new ProductValidation();
