import { Router } from "express";
import { UserTypeController } from "../controller/userType.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, UserTypeController.createUserType);
router.get("/",authenticate, UserTypeController.getUserTypes);
router.get("/:id",authenticate, UserTypeController.getUserTypeById);
router.patch("/:id",authenticate, UserTypeController.updateUserType);
router.delete("/:id",authenticate, UserTypeController.deleteUserType);

export default router;