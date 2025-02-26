import { Router } from "express";
import { UserDemoMappingController } from "../controller/userDemoMapping.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, UserDemoMappingController.addUserDemoMapping);
router.get("/",authenticate, UserDemoMappingController.fetchUserDemoMappings);
router.get("/:id",authenticate, UserDemoMappingController.fetchUserDemoMappingById);
router.patch("/:id",authenticate, UserDemoMappingController.editUserDemoMapping);
router.delete("/:id",authenticate, UserDemoMappingController.removeUserDemoMapping);

export default router;
