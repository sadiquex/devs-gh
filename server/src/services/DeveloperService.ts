import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Developer } from "../entities/Developer";

export class DeveloperService {
  private developerRepository: Repository<Developer>;

  constructor() {
    this.developerRepository = AppDataSource.getRepository(Developer);
  }

  async findAll(): Promise<Developer[]> {
    return await this.developerRepository.find({
      where: { isActive: true },
      order: { createdAt: "DESC" },
    });
  }

  async findById(id: string): Promise<Developer | null> {
    return await this.developerRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async create(developerData: Partial<Developer>): Promise<Developer> {
    const developer = this.developerRepository.create(developerData);
    return await this.developerRepository.save(developer);
  }

  async update(
    id: string,
    developerData: Partial<Developer>
  ): Promise<Developer | null> {
    await this.developerRepository.update(id, developerData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.developerRepository.update(id, {
      isActive: false,
    });
    return result.affected !== 0;
  }
}
