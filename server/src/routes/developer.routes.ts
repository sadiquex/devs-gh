import { Router } from "express";
import {
  createDeveloper,
  getDevelopers,
  getDeveloperById,
} from "../controllers/developer.controller";
import { validateBody } from "../middleware/validate";
import { CreateDeveloperDto } from "../dtos/developer.dto";

const router = Router();

router
  .route("/")
  .get(getDevelopers)
  .post([validateBody(CreateDeveloperDto), createDeveloper]);

router.route("/:id").get(getDeveloperById);

export default router;
