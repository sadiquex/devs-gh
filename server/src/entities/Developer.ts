import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// profile image url, name(required), role(required), years of experience (required), tech stack, portfolio link (required), twitter handle, github(required), linkedin(required)

@Entity("developers")
export class Developer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  role!: string;

  @Column({ type: "integer", nullable: false })
  yearsOfExperience!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  portfolioLink!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  twitterHandle?: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  github!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  linkedin!: string;

  @Column({ type: "varchar", array: true, nullable: true })
  skills?: string[];

  @Column({ type: "varchar", array: true, nullable: true })
  technologies?: string[];

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
