import { Router } from "express";
import { CountriesController } from "../controller/countries.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";

const router = Router();

router.post("/",authenticate, CountriesController.createCountries);
router.get("/",authenticate, CountriesController.getAllCountries);
router.get("/:id",authenticate, CountriesController.getCountriesById);
router.patch("/:id",authenticate, CountriesController.updateCountries);
router.delete("/:id",authenticate, CountriesController.deleteCountries);

export default router;
