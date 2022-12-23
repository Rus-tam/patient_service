import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository, LessThan, Equal } from "typeorm";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";
import { PatientListInterface } from "../interfaces/patientList.interface";
const moment = require("moment");

@Injectable()
export class MedicalExaminationService {
  constructor(
    @InjectRepository(MedicalExaminationEntity)
    private medicalExaminationRepository: Repository<MedicalExaminationEntity>,
  ) {}

  async newMedicalExamination(examination: MedicalExaminationDto, patient: PatientEntity) {
    const newMedicalExamination = this.medicalExaminationRepository.create({
      createdAt: new Date(),
      AMDType: examination.AMDType,
      visualAcuity: examination.visualAcuity,
      injectionDate: examination.injectionDate,
      nextInspectionDate: examination.nextInspectionDate,
      examinationResult: examination.examinationResult,
      patient,
    });

    await this.medicalExaminationRepository.save(newMedicalExamination);

    return newMedicalExamination;
  }

  async getAllMedExaminations() {
    return this.medicalExaminationRepository.find({ relations: ["patient"] });
  }

  async findByDates(injectionDate: Date, nextInspectionDate: Date): Promise<MedicalExaminationEntity[]> {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate, nextInspectionDate }],
    });
  }

  async findByCurrentDates(currentDate: Date) {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: Equal(currentDate), nextInspectionDate: Equal(currentDate) }],
    });
  }

  makeMinPatientInfoObj(medExam: MedicalExaminationEntity): MinPatientInfoInterface {
    return {
      name: medExam.patient.name,
      surname: medExam.patient.surname,
      patronymic: medExam.patient.patronymic,
      patientBirthDate: medExam.patient.patientBirthDate,
      phone: medExam.patient.phone,
      AMDType: medExam.AMDType,
      injectionDate: medExam.injectionDate,
      nextInspectionDate: medExam.nextInspectionDate,
    };
  }
}
