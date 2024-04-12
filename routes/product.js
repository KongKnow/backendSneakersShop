const express = require("router")

const productController = require("../controllers/product")

const router = express.Router()

router.get("/products", productController.getProducts)
router.get("/categories", productController.getCategories)

module.exports = router
