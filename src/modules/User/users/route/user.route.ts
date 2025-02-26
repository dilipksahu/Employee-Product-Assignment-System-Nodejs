import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authenticate } from "../../../..//middleware/auth.middleware";
import { isAdmin } from "../../../../middleware/admin.middleware"

const router = Router();

router.post('/register',authenticate,isAdmin,UserController.register);
router.post('/login', UserController.login);
router.get("/",authenticate, UserController.fetchUsers);
router.get("/:id",authenticate, UserController.fetchUsersById);
router.patch("/:id",authenticate, UserController.editUser);
router.delete("/:id",authenticate, UserController.removeUser);

export default router;
