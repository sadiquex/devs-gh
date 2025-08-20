import { MigrationInterface, QueryRunner } from "typeorm";

export class TransformDeveloperTable1755723450288
  implements MigrationInterface
{
  name = "TransformDeveloperTable1755723450288";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique constraint on email first
    await queryRunner.query(
      `ALTER TABLE "developers" DROP CONSTRAINT "UQ_c3b619f396a081afc995c856bdc"`
    );

    // Drop old columns that are no longer needed
    await queryRunner.query(`ALTER TABLE "developers" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "developers" DROP COLUMN "bio"`);
    await queryRunner.query(`ALTER TABLE "developers" DROP COLUMN "location"`);
    await queryRunner.query(`ALTER TABLE "developers" DROP COLUMN "website"`);

    // Add new required columns
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "role" character varying(100) NOT NULL DEFAULT 'Developer'`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "yearsOfExperience" integer NOT NULL DEFAULT 0`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "portfolioLink" character varying(100) NOT NULL DEFAULT 'https://example.com'`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "twitterHandle" character varying(100)`
    );

    // Update existing records to have default values for github and linkedin
    await queryRunner.query(
      `UPDATE "developers" SET "github" = 'https://github.com/username' WHERE "github" IS NULL`
    );
    await queryRunner.query(
      `UPDATE "developers" SET "linkedin" = 'https://linkedin.com/in/username' WHERE "linkedin" IS NULL`
    );

    // Make github and linkedin NOT NULL
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "github" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "linkedin" SET NOT NULL`
    );

    // Update skills and technologies to use simple-array type
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "skills" TYPE character varying[] USING skills::character varying[]`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "technologies" TYPE character varying[] USING technologies::character varying[]`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert skills and technologies back to text
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "technologies" TYPE text USING array_to_string(technologies, ',')`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "skills" TYPE text USING array_to_string(skills, ',')`
    );

    // Make github and linkedin nullable again
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "linkedin" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ALTER COLUMN "github" DROP NOT NULL`
    );

    // Drop new columns
    await queryRunner.query(
      `ALTER TABLE "developers" DROP COLUMN "twitterHandle"`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" DROP COLUMN "portfolioLink"`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" DROP COLUMN "yearsOfExperience"`
    );
    await queryRunner.query(`ALTER TABLE "developers" DROP COLUMN "role"`);

    // Add back old columns
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "website" character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "location" character varying(50)`
    );
    await queryRunner.query(`ALTER TABLE "developers" ADD "bio" text`);
    await queryRunner.query(
      `ALTER TABLE "developers" ADD "email" character varying(100) NOT NULL DEFAULT 'developer@example.com'`
    );

    // Restore the unique constraint on email
    await queryRunner.query(
      `ALTER TABLE "developers" ADD CONSTRAINT "UQ_c3b619f396a081afc995c856bdc" UNIQUE ("email")`
    );
  }
}
