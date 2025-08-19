import { Router } from "express";
import { DeveloperController } from "../controllers/DeveloperController";

const router = Router();
const developerController = new DeveloperController();

// GET /api/developers - Get all developers
router.get("/", (req, res) => developerController.getAllDevelopers(req, res));

// GET /api/developers/:id - Get developer by ID
router.get("/:id", (req, res) =>
  developerController.getDeveloperById(req, res)
);

// POST /api/developers - Create new developer
router.post("/", (req, res) => developerController.createDeveloper(req, res));

// PUT /api/developers/:id - Update developer
router.put("/:id", (req, res) => developerController.updateDeveloper(req, res));

// DELETE /api/developers/:id - Delete developer
router.delete("/:id", (req, res) =>
  developerController.deleteDeveloper(req, res)
);

export default router;
