import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsBoolean,
  IsUrl,
  MinLength,
  MaxLength,
  Min,
  IsNumber,
  Max,
} from "class-validator";
import { Transform } from "class-transformer";

// profile image url, name(required), role(required), years of experience (required), tech stack, portfolio link (required), twitter handle, github(required), linkedin(required)

export class CreateDeveloperDto {
  // @IsString()
  // @IsUrl({}, { message: "Please provide a valid profile image URL" })
  // profileImageUrl!: string;
  // - Accept profile photo - upload to cloudinary and send the url to the backend

  @IsString()
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @MaxLength(100, { message: "Name cannot exceed 100 characters" })
  name!: string;

  @IsString()
  @MinLength(2, { message: "Role must be at least 2 characters long" })
  @MaxLength(100, { message: "Role cannot exceed 100 characters" })
  role!: string;

  @IsNumber()
  @Min(0, { message: "Years of experience must be at least 0" })
  @Max(50, { message: "Years of experience cannot exceed 50" })
  yearsOfExperience!: number;

  @IsString()
  @IsUrl({}, { message: "Please provide a valid portfolio link" })
  portfolioLink!: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: "Please provide a valid Twitter handle" })
  twitterHandle?: string;

  @IsString()
  @IsUrl({}, { message: "Please provide a valid GitHub URL" })
  github!: string;

  @IsString()
  @IsUrl({}, { message: "Please provide a valid LinkedIn URL" })
  linkedin!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  technologies?: string[];

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === "true" || value === true)
  isActive?: boolean;
}
