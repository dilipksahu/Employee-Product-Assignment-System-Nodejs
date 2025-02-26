import { Router } from "express";
import { RegionController } from "../controller/region.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, RegionController.createRegion);
router.get("/",authenticate, RegionController.getAllRegions);
router.get("/:id",authenticate, RegionController.getRegionById);
router.patch("/:id",authenticate, RegionController.updateRegion);
router.delete("/:id",authenticate, RegionController.deleteRegion);

export default router;
