import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsBoolean,
  IsUrl,
  MinLength,
  MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateDeveloperDto {
  @IsString()
  @MinLength(2, { message: "Name must be at least 2 characters long" })
  @MaxLength(100, { message: "Name cannot exceed 100 characters" })
  name!: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "Bio cannot exceed 500 characters" })
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Location cannot exceed 50 characters" })
  location?: string;

  @IsOptional()
  @IsUrl({}, { message: "Please provide a valid website URL" })
  website?: string;

  @IsOptional()
  @IsUrl({}, { message: "Please provide a valid GitHub URL" })
  github?: string;

  @IsOptional()
  @IsUrl({}, { message: "Please provide a valid LinkedIn URL" })
  linkedin?: string;

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

// export class UpdateDeveloperDto {
//   @IsOptional()
//   @IsString()
//   @MinLength(2, { message: "Name must be at least 2 characters long" })
//   @MaxLength(100, { message: "Name cannot exceed 100 characters" })
//   name?: string;

//   @IsOptional()
//   @IsEmail({}, { message: "Please provide a valid email address" })
//   email?: string;

//   @IsOptional()
//   @IsString()
//   @MaxLength(500, { message: "Bio cannot exceed 500 characters" })
//   bio?: string;

//   @IsOptional()
//   @IsString()
//   @MaxLength(50, { message: "Location cannot exceed 50 characters" })
//   location?: string;

//   @IsOptional()
//   @IsUrl({}, { message: "Please provide a valid website URL" })
//   website?: string;

//   @IsOptional()
//   @IsUrl({}, { message: "Please provide a valid GitHub URL" })
//   github?: string;

//   @IsOptional()
//   @IsUrl({}, { message: "Please provide a valid LinkedIn URL" })
//   linkedin?: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
//   skills?: string[];

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
//   technologies?: string[];

//   @IsOptional()
//   @IsBoolean()
//   @Transform(({ value }) => value === "true" || value === true)
//   isActive?: boolean;
// }
