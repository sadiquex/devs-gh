import { Request, Response } from "express";
import { DeveloperService } from "../services/DeveloperService";

export class DeveloperController {
  private developerService: DeveloperService;

  constructor() {
    this.developerService = new DeveloperService();
  }

  async getAllDevelopers(req: Request, res: Response): Promise<void> {
    try {
      const developers = await this.developerService.findAll();
      res.status(200).json({
        success: true,
        data: developers,
        message: "Developers retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving developers",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getDeveloperById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const developer = await this.developerService.findById(id);

      if (!developer) {
        res.status(404).json({
          success: false,
          message: "Developer not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: developer,
        message: "Developer retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving developer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async createDeveloper(req: Request, res: Response): Promise<void> {
    try {
      const developer = await this.developerService.create(req.body);
      res.status(201).json({
        success: true,
        data: developer,
        message: "Developer created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating developer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async updateDeveloper(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const developer = await this.developerService.update(id, req.body);

      if (!developer) {
        res.status(404).json({
          success: false,
          message: "Developer not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: developer,
        message: "Developer updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating developer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async deleteDeveloper(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.developerService.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Developer not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Developer deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting developer",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
