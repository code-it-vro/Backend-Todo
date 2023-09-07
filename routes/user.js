import  express  from "express";
import { getMyprofile, login, register ,logout  } from "../controllers/user.js";
import { isAuthentiacted } from "../middlewares/auth.js";

const router =express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthentiacted ,getMyprofile); 


export default router;