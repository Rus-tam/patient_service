import { PatientService } from "./patient.service";
import { Repository } from "typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MedicalExaminationService } from "./medicalExamination.service";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import exp from "constants";

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

const medicalExamination: MedicalExaminationEntity = {
  id: 1,
  createdAt: new Date(),
  AMDType: "wet",
  visualAcuityOD: "-1",
  visualAcuityOS: "0.5",
  tonometryOD: "23",
  tonometryOS: "24",
  refractometryODsph: "21",
  refractometryODcyl: "21",
  refractometryODax: "23",
  refractometryOSsph: "23",
  refractometryOScyl: "23",
  refractometryOSax: "23",
  biomicroscopyOD: "44",
  biomicroscopyOS: "44",
  eyeBottomOD: "77",
  eyeBottomOS: "77",
  additionalExamOD: "all good",
  additionalExamOS: "all good",
  nextInjectionDate: new Date("2023-04-04"),
  nextInjectionTime: new Date("10:05"),
  nextInspectionDate: new Date("2023-04-04"),
  nextInspectionTime: new Date("10:30"),
  injectionDate: new Date("2023-04-05"),
  clinicAddress: "ufa",
  phoneForInformation: "+79867890909",
  drugName: "blabla",
  examinationResult: "all good",
  formOfDisease: "secondary",
  VEGFTherapyHistory: "it is a long story",
  patient: patientCard,
  deletedAt: null,
};

describe("MedicalExaminationService", () => {
  let patientService: PatientService;
  let patientRepository: Repository<PatientEntity>;
  let medicalExaminationService: MedicalExaminationService;
  let medicalExaminationRepository: Repository<MedicalExaminationEntity>;

  const mockPatientRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockMedicalExaminationRepository = {
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
        MedicalExaminationService,
        {
          provide: getRepositoryToken(MedicalExaminationEntity),
          useValue: mockMedicalExaminationRepository,
        },
      ],
    }).compile();

    patientService = moduleRef.get<PatientService>(PatientService);
    patientRepository = moduleRef.get<Repository<PatientEntity>>(getRepositoryToken(PatientEntity));
    medicalExaminationService = moduleRef.get<MedicalExaminationService>(MedicalExaminationService);
    medicalExaminationRepository = moduleRef.get<Repository<MedicalExaminationEntity>>(
      getRepositoryToken(MedicalExaminationEntity),
    );
  });

  describe("createMedicalExamination", () => {
    it("should create new medical examination", async () => {
      const examination: MedicalExaminationDto = {
        AMDType: "Test Type",
        visualAcuityOD: "Test Acuity OD",
        visualAcuityOS: "Test Acuity OS",
        tonometryOD: "Test Tonometry OD",
        tonometryOS: "Test Tonometry OS",
        refractometryODsph: "Test Refractometry OD Sph",
        refractometryODcyl: "Test Refractometry OD Cyl",
        refractometryODax: "Test Refractometry OD Ax",
        refractometryOSsph: "Test Refractometry OS Sph",
        refractometryOScyl: "Test Refractometry OS Cyl",
        refractometryOSax: "Test Refractometry OS Ax",
        biomicroscopyOD: "Test Biomicroscopy OD",
        biomicroscopyOS: "Test Biomicroscopy OS",
        eyeBottomOD: "Test Eye Bottom OD",
        eyeBottomOS: "Test Eye Bottom OS",
        additionalExamOD: "Test Additional Exam OD",
        additionalExamOS: "Test Additional Exam OS",
        nextInjectionDate: new Date(),
        nextInjectionTime: new Date().toString(),
        nextInspectionDate: new Date(),
        nextInspectionTime: new Date().toString(),
        injectionDate: new Date(),
        clinicAddress: "Test Clinic Address",
        phoneForInformation: "Test Phone for Information",
        drugName: "Test Drug Name",
        examinationResult: "Test Examination Result",
        formOfDisease: "Test Form of Disease",
        VEGFTherapyHistory: "Test VEGF Therapy History",
      };

      const newMedicalExamination: MedicalExaminationEntity = {
        id: 1,
        createdAt: new Date(),
        ...examination,
        patient: patientCard,
        deletedAt: null,
      };

      jest.spyOn(medicalExaminationRepository, "create").mockReturnValue(newMedicalExamination);
      jest.spyOn(medicalExaminationRepository, "save").mockResolvedValue(newMedicalExamination);

      const result = await medicalExaminationService.createMedicalExamination(
        examination,
        patientCard,
      );

      expect(medicalExaminationRepository.create).toHaveBeenCalledWith({
        createdAt: expect.any(Date),
        ...examination,
        patient: patientCard,
      });

      expect(medicalExaminationRepository.save).toHaveBeenCalledWith(newMedicalExamination);

      expect(result).toEqual(newMedicalExamination);
    });
  });

  describe("getAllMedExaminations", function () {
    it("should find all medical examinations", async () => {
      const mockMedExaminations = [medicalExamination, medicalExamination];
      mockMedicalExaminationRepository.find.mockReturnValue(mockMedExaminations);
      const result = await medicalExaminationService.getAllMedExaminations();
      expect(result).toEqual(mockMedExaminations);
    });
  });

  describe("findByDates", () => {
    it("should find medical examination by dates", async () => {
      const nextInspectionDate = new Date("2023-04-04");
      const nextInjectionDate = new Date("2023-04-04");
      mockMedicalExaminationRepository.find.mockReturnValue(medicalExamination);
      const result = await medicalExaminationService.findByDates(
        nextInjectionDate,
        nextInspectionDate,
      );

      expect(result).toEqual(medicalExamination);
    });
  });

  describe("findByNextInjectionDate", () => {
    it("should find medical examination by next injection date", async () => {
      const nextInjection = new Date("2023-04-04");
      mockMedicalExaminationRepository.find.mockReturnValue(medicalExamination);
      const result = await medicalExaminationService.findByNextInjectionDate(nextInjection);
      expect(result).toEqual(medicalExamination);
    });
  });

  describe("findByNextInspectionDate", () => {
    it("should find medical examination by next inspection date", async () => {
      const nextInspection = new Date("2023-04-04");
      mockMedicalExaminationRepository.find.mockReturnValue(medicalExamination);
      const result = await medicalExaminationService.findByNextInspectionDate(nextInspection);
      expect(result).toEqual(medicalExamination);
    });
  });

  describe("findByCurrentDates", function () {
    it("should find medical examination by current date", async () => {
      const currentDate = new Date("2023-04-04");
      mockMedicalExaminationRepository.find.mockReturnValue(medicalExamination);
      const result = await medicalExaminationService.findByCurrentDates(currentDate);
      expect(result).toEqual(medicalExamination);
    });
  });

  describe("updateMedExam", () => {
    it("should update medical examination", async () => {});
  });
});
