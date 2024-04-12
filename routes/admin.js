const express = require("express")

const adminController = require("../controllers/admin")

const router = express.Router()

router.get("/products", adminController.getProducts)
router.post("/post-product", adminController.postProduct)
router.post("/post-product/:productId", adminController.editProduct)
router.delete("/delete-product", adminController.deleteProduct)
router.get("/categories", adminController.getCategories)
router.post("/post-category", adminController.postCategory)

module.exports = router
