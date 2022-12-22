import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository } from "typeorm";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";

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
}
