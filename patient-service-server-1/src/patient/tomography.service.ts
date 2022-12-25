import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TomographyEntity } from "./entities/tomography.entity";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";

@Injectable()
export class TomographyService {
  constructor(
    @InjectRepository(TomographyEntity)
    private tomographyRepository: Repository<TomographyEntity>,
  ) {}

  async createTomographyPic(file: Express.Multer.File, patient: PatientEntity) {
    const newTomography = this.tomographyRepository.create({
      fileName: file.originalname,
      createdDate: new Date(),
      image: file.buffer,
      patient,
    });

    await this.tomographyRepository.save(newTomography);

    return newTomography;
  }

  // async newMedicalExamination(examination: MedicalExaminationDto, patient: PatientEntity) {
  //   const newMedicalExamination = this.medicalExaminationRepository.create({
  //     createdAt: new Date(),
  //     AMDType: examination.AMDType,
  //     visualAcuity: examination.visualAcuity,
  //     injectionDate: examination.injectionDate,
  //     nextInspectionDate: examination.nextInspectionDate,
  //     examinationResult: examination.examinationResult,
  //     patient,
  //   });
  //
  //   await this.medicalExaminationRepository.save(newMedicalExamination);
  //
  //   return newMedicalExamination;
  // }
}
