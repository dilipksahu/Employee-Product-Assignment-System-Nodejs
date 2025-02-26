import { Router } from "express";
import { ProductCategoriesController } from "../controller/productCategories.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, ProductCategoriesController.createProductCategories);
router.get("/",authenticate, ProductCategoriesController.getProductCategories);
router.get("/:id",authenticate, ProductCategoriesController.getProductCategoriesById);
router.patch("/:id",authenticate, ProductCategoriesController.updateProductCategories);
router.delete("/:id",authenticate, ProductCategoriesController.deleteProductCategories);

export default router;