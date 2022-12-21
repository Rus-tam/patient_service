import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { CreatePatientDto } from "./dto/createPatient.dto";
import { PatientError } from "../errors/patient.error";
import { AllPatientsInfoInterface } from "../interfaces/allPatientsInfo.interface";
import { UpdateCardDto } from "./dto/updateCard.dto";
import { NextWeekPatientsInterface } from "../interfaces/nextWeekPatients.interface";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async createPatient(patientData: CreatePatientDto): Promise<PatientEntity> {
    // Проверяем нет ли в базе карточки пациента
    const existingPatient = await this.patientRepository.find({
      where: [{ phoneNumber: patientData.phoneNumber, name: patientData.name, surname: patientData.surname }],
    });
    if (existingPatient[0]) {
      Logger.error("There is patient with such name and phone number");
      throw new ConflictException(PatientError.DuplicatePatientData);
    }

    // Создаем карточку пациента
    const patient = this.patientRepository.create({
      name: patientData.name,
      surname: patientData.surname,
      patronymic: patientData.patronymic,
      patientBirthDate: patientData.patientBirthDate,
      phoneNumber: patientData.phoneNumber,
      AMDType: "",
      visualAcuity: "",
      medicalExaminations: [],
      tomography: [],
      injectionDate: "01.01.1970",
      nextInspectionDate: "01.01.1970",
      missedInjection: false,
      healthStatus: "sick",
      createdAt: new Date(),
      updatedAt: null,
    });

    await this.patientRepository.save(patient);

    return patient;
  }

  async getAllPatients(): Promise<AllPatientsInfoInterface[]> {
    const allPatients = await this.patientRepository.find();
    const allPatientsInfo: AllPatientsInfoInterface[] = [];

    allPatients.forEach((patient) => {
      allPatientsInfo.push({
        id: patient.id,
        name: patient.name,
        surname: patient.surname,
        patronymic: patient.patronymic,
        patientBirthDate: patient.patientBirthDate,
        phoneNumber: patient.phoneNumber,
        AMDType: patient.AMDType,
        visualAcuity: patient.visualAcuity,
        healthStatus: patient.healthStatus,
      });
    });

    return allPatientsInfo;
  }

  async getPatientById(id: number) {
    return this.patientRepository.findOneBy({ id });
  }

  async updatePatientCard(update: UpdateCardDto, id: number): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOneBy({ id });

    const updatedPatient = {
      id: patient.id,
      name: patient.name,
      surname: patient.surname,
      patronymic: patient.patronymic,
      patientBirthDate: patient.patientBirthDate,
      phoneNumber: update.phoneNumber,
      AMDType: update.AMDType,
      visualAcuity: update.visualAcuity,
      medicalExaminations: [],
      tomography: [],
      injectionDate: update.injectionDate,
      nextInspectionDate: update.nextInspectionDate,
      missedInjection: false,
      healthStatus: update.healthStatus,
      createdAt: patient.createdAt,
      updatedAt: new Date(),
      deletedAt: patient.deletedAt,
    };

    await this.patientRepository.save(updatedPatient);

    return updatedPatient;
  }

  async checkNextWeekPatients(injectionDate: Date): Promise<NextWeekPatientsInterface> {
    const AMDWet: PatientEntity[] = [];
    const AMDDry: PatientEntity[] = [];
    const patients = await this.patientRepository.findBy({ injectionDate });
    patients.forEach((patient) => {
      if (patient.AMDType === "Wet") {
        AMDWet.push(patient);
      } else {
        AMDDry.push(patient);
      }
    });

    return { injectionDate: AMDWet, nextInspectionDate: AMDDry };
  }

  async findPatientBySurname(surname: string): Promise<PatientEntity[]> {
    return this.patientRepository.findBy({ surname });
  }

  async getAllHealthyPatients(): Promise<PatientEntity[]> {
    return this.patientRepository.find({ where: [{ healthStatus: "healthy" }] });
  }

  async deletePatient(id: number): Promise<void> {
    await this.patientRepository.delete({ id });
  }
}
