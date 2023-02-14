import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { AppModule } from "../app.module";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { TomographyEntity } from "./entities/tomography.entity";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

describe("Patient Service", () => {
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
          host: process.env.TEST_DB_HOST,
          port: Number(process.env.TEST_DB_PORT),
          username: process.env.TEST_DB_USERNAME,
          password: process.env.TEST_DB_PASSWORD,
          database: process.env.TEST_DB_NAME,
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

  it("should create patient card", async () => {
    const card = patientRepository.create({
      name: "Иван",
      surname: "Иванов",
      patronymic: "Иванович",
      patientBirthDate: "22.10.1980",
      phone: "+79856784312",
      kinsmenPhone: "+79864531234",
      medicalExaminations: [],
      tomography: [],
      createdAt: new Date(),
      updatedAt: null,
      lastVisit: null,
    });

    await patientRepository.save(card);
    const savedCard = await patientRepository.findOne({
      where: { name: "Иван", surname: "Иванов" },
    });

    expect(savedCard).toBeDefined();
    expect(savedCard.name).toEqual("Иван");
    expect(savedCard.surname).toEqual("Иванов");
  });

  it("should update patient card", async () => {
    const patientCard = await patientRepository.findOne({
      where: { surname: "Иванов" },
    });
    const id = patientCard.id;
    const update = {
      name: "Петр",
      surname: "Иванов",
      patronymic: "Иванович",
      patientBirthDate: "22.10.1980",
      phone: "+79856784312",
      kinsmenPhone: "+79864531234",
    };

    await patientRepository.update(id, update);

    const updatedCard = await patientRepository.findOneBy({ id });

    expect(updatedCard).toBeDefined();
    expect(updatedCard.name).toEqual("Петр");
  });
});
