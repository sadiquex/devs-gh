import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Developer } from "../entities/Developer";
import { ResponseBuilder } from "../dtos/response.dto";

const developerRepository = AppDataSource.getRepository(Developer);

export const createDeveloper = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      bio,
      location,
      website,
      github,
      linkedin,
      skills,
      technologies,
    } = req.body;

    const existing = await developerRepository.findOneBy({ email });
    if (existing) {
      res
        .status(400)
        .json(
          ResponseBuilder.error(
            "Email already exists",
            "Email already exists",
            400,
            req.originalUrl
          )
        );
      return;
    }

    const developer = developerRepository.create({
      name,
      email,
      bio,
      location,
      website,
      github,
      linkedin,
      skills,
      technologies,
    });

    await developerRepository.save(developer);

    res
      .status(201)
      .json(
        ResponseBuilder.created(developer, "Developer created successfully")
      );
  }
);

export const getDevelopers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const developers = await developerRepository.find({
      order: { name: "ASC" },
    });
    res.status(200).json(ResponseBuilder.success(developers));
  }
);

export const getDeveloperById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const developer = await developerRepository.findOneBy({
      id,
    });

    if (!developer) {
      res
        .status(404)
        .json(
          ResponseBuilder.error(
            `Developer with id ${id} does not exist`,
            "Developer not found",
            404,
            req.originalUrl
          )
        );
      return;
    }

    res.status(200).json(ResponseBuilder.success(developer));
  }
);
