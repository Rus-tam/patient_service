import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { AppModule } from "../app.module";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { TomographyEntity } from "./entities/tomography.entity";
import * as dotenv from "dotenv";

dotenv.config();

describe("PostgreSQL", () => {
  let app: INestApplication;
  let connection: Connection;
  let patientRepository: Repository<PatientEntity>;
  let medicalExaminationRepository: Repository<MedicalExaminationEntity>;
  let tomographyRepository: Repository<TomographyEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "postgres",
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [PatientEntity, MedicalExaminationEntity, TomographyEntity],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    connection = module.get<Connection>(Connection);
    patientRepository = connection.getRepository(PatientEntity);
    medicalExaminationRepository = connection.getRepository(MedicalExaminationEntity);
    tomographyRepository = connection.getRepository(TomographyEntity);
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  it("should be defined", () => {
    expect(patientRepository).toBeDefined();
  });
});
