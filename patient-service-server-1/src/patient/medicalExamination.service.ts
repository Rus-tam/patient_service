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
      visualAcuityOD: examination.visualAcuityOD,
      visualAcuityOS: examination.visualAcuityOS,
      tonometryOD: examination.tonometryOD,
      tonometryOS: examination.tonometryOS,
      refractometryODsph: examination.refractometryODsph,
      refractometryODcyl: examination.refractometryODcyl,
      refractometryODax: examination.refractometryODax,
      refractometryOSsph: examination.refractometryOSsph,
      refractometryOScyl: examination.refractometryOScyl,
      refractometryOSax: examination.refractometryOSax,
      biomicroscopyOD: examination.biomicroscopyOD,
      biomicroscopyOS: examination.biomicroscopyOS,
      eyeBottomOD: examination.eyeBottomOD,
      eyeBottomOS: examination.eyeBottomOS,
      additionalExamOD: examination.additionalExamOD,
      additionalExamOS: examination.additionalExamOS,
      nextInjectionDate: examination.nextInjectionDate,
      nextInjectionTime: examination.nextInjectionTime,
      nextInspectionDate: examination.nextInspectionDate,
      nextInspectionTime: examination.nextInspectionTime,
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
      AMDType: update.AMDType,
      visualAcuityOD: update.visualAcuityOD,
      visualAcuityOS: update.visualAcuityOS,
      tonometryOD: update.tonometryOD,
      tonometryOS: update.tonometryOS,
      refractometryODsph: update.refractometryODsph,
      refractometryODcyl: update.refractometryODcyl,
      refractometryODax: update.refractometryODax,
      refractometryOSsph: update.refractometryOSsph,
      refractometryOScyl: update.refractometryOScyl,
      refractometryOSax: update.refractometryOSax,
      biomicroscopyOD: update.biomicroscopyOD,
      biomicroscopyOS: update.biomicroscopyOS,
      eyeBottomOD: update.eyeBottomOD,
      eyeBottomOS: update.eyeBottomOS,
      additionalExamOD: update.additionalExamOD,
      additionalExamOS: update.additionalExamOS,
      nextInjectionDate: update.nextInjectionDate,
      nextInjectionTime: update.nextInjectionTime,
      nextInspectionDate: update.nextInspectionDate,
      nextInspectionTime: update.nextInspectionTime,
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
