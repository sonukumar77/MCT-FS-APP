const router = require("express").Router();
const CategoryController = require("../Controller/categoryController");

router.get("/", CategoryController.getAllcategory);

module.exports = router;
