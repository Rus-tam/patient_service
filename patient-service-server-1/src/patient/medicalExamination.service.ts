import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository } from "typeorm";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";
import { moveMessagePortToContext } from "worker_threads";
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

  async checkSevenDaysPatientList() {
    const AMDWet: PatientEntity[] = [];
    const AMDDry: PatientEntity[] = [];
    const currentDate = moment(new Date()).format("DD.MM.YYYY");
    const plusSevenDays = moment(currentDate, "DD.MM.YYYY").add(7, "days");
    console.log("FFFFFFF", plusSevenDays);
    const medicalExaminations = await this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: plusSevenDays }],
    });
    console.log("HHHHHH", medicalExaminations);
    medicalExaminations.forEach((examination) => {
      if (examination.AMDType === "wet") {
        AMDWet.push(examination.patient);
      } else {
        AMDDry.push(examination.patient);
      }
    });

    return { injectionDate: AMDWet, nextInspectionDate: AMDDry };
  }
}
