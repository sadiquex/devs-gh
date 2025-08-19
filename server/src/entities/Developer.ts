import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("developers")
export class Developer {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email!: string;

  @Column({ type: "text", nullable: true })
  bio!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  location!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  website!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  github!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  linkedin!: string;

  @Column({ type: "simple-array", nullable: true })
  skills!: string[];

  @Column({ type: "simple-array", nullable: true })
  technologies!: string[];

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
