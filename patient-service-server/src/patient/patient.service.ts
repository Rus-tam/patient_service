import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { CreatePatientDto } from "./dto/createPatient.dto";
import { PatientError } from "../errors/patient.error";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async createPatient(patientData: CreatePatientDto): Promise<PatientEntity> {
    // Проверяем нет ли в базе карточки пациента
    const existingPatient = await this.patientRepository.find({
      where: [{ phoneNumber: patientData.phoneNumber }, { patientName: patientData.patientName }],
    });
    if (existingPatient[0]) {
      Logger.error("There is patient with such name and phone number");
      throw new ConflictException(PatientError.DuplicatePatientData);
    }

    // Создаем карточку пациента
    const patient = this.patientRepository.create({
      patientName: patientData.patientName,
      patientBirthDate: patientData.patientBirthDate,
      phoneNumber: patientData.phoneNumber,
      AMDType: "",
      visualAcuity: "",
      medicalExaminations: [],
      tomography: [],
      injectionDate: patientData.patientBirthDate,
      nextInspectionDate: patientData.patientBirthDate,
      missedInjection: false,
      createdAt: new Date(),
    });

    await this.patientRepository.save(patient);

    return patient;
  }
}
