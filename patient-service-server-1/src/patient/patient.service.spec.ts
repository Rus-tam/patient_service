import { Test, TestingModule } from "@nestjs/testing";
import { ConflictException, INestApplication } from "@nestjs/common";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Connection, Repository, UpdateResult } from "typeorm";
import { AppModule } from "../app.module";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { TomographyEntity } from "./entities/tomography.entity";
import * as dotenv from "dotenv";
import { PatientService } from "./patient.service";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";

dotenv.config({ path: ".env.test" });

describe("PG", () => {
  let app: INestApplication;
  let connection: Connection;
  let patientRepository: Repository<PatientEntity>;
  let medicalExaminationRepository: Repository<MedicalExaminationEntity>;
  let tomographyRepository: Repository<TomographyEntity>;
  let id: number;

  beforeEach(async () => {
    const card = await patientRepository.findOne({
      where: { name: "Иван", surname: "Иванов" },
    });

    card.id !== undefined ? (id = card.id) : null;
  });

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

  it("should find all patients cards", async () => {
    const patientCards = await patientRepository.find({
      relations: ["medicalExaminations"],
    });

    expect(patientCards.length).toBeGreaterThan(0);
    expect(patientCards[0].medicalExaminations).toBeDefined();
  });

  it("should find all patient cards wit min info", async () => {
    const patientCards = await patientRepository.find();

    expect(patientCards.length).toBeGreaterThan(0);
    expect(patientCards[0].medicalExaminations).not.toBeDefined();
  });

  it("should find patient card by id", async () => {
    const patientCard = await patientRepository.findOne({
      where: { id },
      relations: ["medicalExaminations", "tomography"],
    });

    expect(patientCard).toBeDefined();
    expect(patientCard.medicalExaminations).toBeDefined();
    expect(patientCard.tomography).toBeDefined();
  });

  it("should delete patient by id", async () => {
    await patientRepository.delete({ id });
    const patientCard = await patientRepository.findOneBy({ id });

    expect(patientCard).toBeNull();
  });
});

// Patient service
describe("PatientService", () => {
  let patientService: PatientService;
  let patientRepository: Repository<PatientEntity>;

  const mockPatientRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(PatientEntity),
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    patientService = moduleRef.get<PatientService>(PatientService);
    patientRepository = moduleRef.get<Repository<PatientEntity>>(getRepositoryToken(PatientEntity));
  });

  describe("createPatientCard", () => {
    it("should create a new patient card", async () => {
      const createPatientCard: CreatePatientCardDto = {
        name: "John",
        surname: "Doe",
        patronymic: "Smith",
        patientBirthDate: new Date("1990-01-01"),
        phone: "1234567890",
        kinsmenPhone: "0987654321",
      };

      const patient = new PatientEntity();
      patient.name = createPatientCard.name;
      patient.surname = createPatientCard.surname;
      patient.patronymic = createPatientCard.patronymic;
      patient.patientBirthDate = createPatientCard.patientBirthDate;
      patient.phone = createPatientCard.phone;
      patient.kinsmenPhone = createPatientCard.kinsmenPhone;
      patient.createdAt = new Date();
      patient.updatedAt = null;
      patient.lastVisit = null;

      mockPatientRepository.find.mockResolvedValue([]);

      mockPatientRepository.create.mockReturnValue(patient);
      mockPatientRepository.save.mockResolvedValue(patient);

      const result = await patientService.createPatientCard(createPatientCard);
      expect(result).toEqual(patient);
    });
  });

  describe("updatePatientCard", () => {
    it("should update patient card", async () => {
      const patientCard: PatientEntity = {
        id: 1,
        name: "John",
        surname: "Doe",
        patronymic: "Smith",
        patientBirthDate: new Date("10-10-1980"),
        phone: "+78905678904",
        kinsmenPhone: "+7980987675423",
        createdAt: new Date(),
        medicalExaminations: [],
        tomography: [],
        updatedAt: null,
        lastVisit: null,
        deletedAt: null,
      };
      const updatedPatientCard: PatientEntity = {
        id: 1,
        name: "Will",
        surname: "Doe",
        patronymic: "Smith",
        patientBirthDate: new Date("10-10-1980"),
        phone: "+78906785645",
        kinsmenPhone: "+78976543423",
        createdAt: new Date(),
        medicalExaminations: [],
        tomography: [],
        updatedAt: null,
        lastVisit: null,
        deletedAt: null,
      };
      const update: CreatePatientCardDto = {
        name: "Will",
        surname: "Doe",
        patronymic: "Smith",
        patientBirthDate: new Date("10-10-1980"),
        phone: "+78906785645",
        kinsmenPhone: "+78976543423",
      };

      mockPatientRepository.update.mockResolvedValue(UpdateResult);
      mockPatientRepository.findOne.mockReturnValue(updatedPatientCard);
      await patientService.updatePatientCard(patientCard.id, update);
      const result = await patientService.getPatientById(patientCard.id);

      expect(result).toEqual(updatedPatientCard);
    });
  });
});
