import { Router } from "express";
import { CitiesController } from "../controller/cities.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, CitiesController.createCities);
router.get("/",authenticate, CitiesController.getAllCities);
router.get("/:id",authenticate, CitiesController.getCitiesById);
router.patch("/:id",authenticate, CitiesController.updateCities);
router.delete("/:id",authenticate, CitiesController.deleteCities);

export default router;
