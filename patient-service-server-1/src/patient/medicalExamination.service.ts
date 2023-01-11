import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository, Equal } from "typeorm";
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
      nextInjectionDate: examination.nextInjectionDate,
      nextInspectionDate: examination.nextInspectionDate,
      injectionDate: examination.injectionDate,
      drugName: examination.drugName,
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

  async findByDates(
    nextInjectionDate: Date,
    nextInspectionDate: Date,
  ): Promise<MedicalExaminationEntity[]> {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ nextInjectionDate, nextInspectionDate }],
    });
  }

  async findBynextInjectionDate(nextInjectionDate: Date): Promise<MedicalExaminationEntity[]> {
    return this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ nextInjectionDate }],
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
      where: [{ nextInjectionDate: Equal(currentDate), nextInspectionDate: Equal(currentDate) }],
    });
  }

  async updateMedExam(id: number, update: MedicalExaminationDto) {
    const examination = await this.getById(id);

    const updatedExam = {
      id: id,
      createdAt: examination.createdAt,
      AMDType: examination.AMDType,
      visualAcuity: update.visualAcuity,
      nextInjectionDate: update.nextInjectionDate,
      nextInspectionDate: update.nextInspectionDate,
      injectionDate: update.injectionDate,
      drugName: update.drugName,
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
