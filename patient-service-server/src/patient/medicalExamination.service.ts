import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository } from "typeorm";
import { PatientEntity } from "./entities/patient.entity";

@Injectable()
export class MedicalExaminationService {
  constructor(
    @InjectRepository(MedicalExaminationEntity)
    private medicalExaminationRepository: Repository<MedicalExaminationEntity>,
  ) {}

  async updateMedicalExamination(patient: PatientEntity, examinationResult: string) {
    const newMedicalExamination = this.medicalExaminationRepository.create({
      createdDate: new Date(),
      examinationResult,
      patient,
    });

    await this.medicalExaminationRepository.save(newMedicalExamination);

    return newMedicalExamination;
  }

  async getAllMedExaminations() {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
    });
  }
}
