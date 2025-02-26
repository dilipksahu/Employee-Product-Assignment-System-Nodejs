import { Router } from "express";
import { DemoProductController } from "../controller/demoProduct.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, DemoProductController.addDemoProduct);
router.get("/",authenticate, DemoProductController.fetchDemoProducts);
router.get("/:id",authenticate, DemoProductController.fetchDemoProductById);
router.patch("/:id",authenticate, DemoProductController.editDemoProduct);
router.delete("/:id",authenticate, DemoProductController.removeDemoProduct);

export default router;
