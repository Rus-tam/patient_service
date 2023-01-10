import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository, LessThan, Equal } from "typeorm";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";

@Injectable()
export class MedicalExaminationService {
  constructor(
    @InjectRepository(MedicalExaminationEntity)
    private medicalExaminationRepository: Repository<MedicalExaminationEntity>,
  ) {}

  async createMedicalExamination(examination: MedicalExaminationDto, patient: PatientEntity) {
    const newMedicalExamination = this.medicalExaminationRepository.create({
      createdAt: new Date(),
      AMDType: examination.AMDType,
      visualAcuity: examination.visualAcuity,
      injectionDate: examination.injectionDate,
      nextInspectionDate: examination.nextInspectionDate,
      examinationResult: examination.examinationResult,
      formOfDisease: examination.formOfDisease,
      VEGFTherapyHistory: examination.VEGFTherapyHistory,
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

  async findByInjectionDate(injectionDate: Date): Promise<MedicalExaminationEntity[]> {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate }],
    });
  }

  async findByNextInspectionDate(nextInspectionDate: Date): Promise<MedicalExaminationEntity[]> {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ nextInspectionDate }],
    });
  }

  async findByCurrentDates(currentDate: Date) {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: Equal(currentDate), nextInspectionDate: Equal(currentDate) }],
    });
  }

  async updateMedExam(id: number, update: MedicalExaminationDto) {
    const examination = await this.getById(id);

    const updatedExam = {
      id: id,
      createdAt: examination.createdAt,
      AMDType: examination.AMDType,
      visualAcuity: update.visualAcuity,
      injectionDate: update.injectionDate,
      nextInspectionDate: update.nextInspectionDate,
      examinationResult: update.examinationResult,
      formOfDisease: update.formOfDisease,
      VEGFTherapyHistory: update.VEGFTherapyHistory,
      patient: examination.patient,
    };

    await this.medicalExaminationRepository.update(id, updatedExam);

    return updatedExam;
  }

  async getById(id: number): Promise<MedicalExaminationEntity> {
    return this.medicalExaminationRepository.findOne({
      relations: ["patient"],
      where: [{ id }],
    });
  }
}
