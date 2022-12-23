import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Repository, LessThan, Equal } from "typeorm";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";
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

  async checkMissedPatientList(): Promise<MinPatientInfoInterface[]> {
    const patients: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date(), "DD.MM.YYYY");
    const missedMedExam = await this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: LessThan(currentDate), nextInspectionDate: LessThan(currentDate) }],
    });

    missedMedExam.forEach((elem) => patients.push(this.makeMinPatientInfoObj(elem)));

    return patients;
  }

  async checkSevenDaysPatientList(): Promise<{
    injectionDate: MinPatientInfoInterface[];
    nextInspectionDate: MinPatientInfoInterface[];
  }> {
    const AMDWet: MinPatientInfoInterface[] = [];
    const AMDDry: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date()).format("DD.MM.YYYY");
    const plusSevenDays = moment(currentDate, "DD.MM.YYYY").add(7, "days");
    const medicalExaminations = await this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: plusSevenDays, nextInspectionDate: plusSevenDays }],
    });
    medicalExaminations.forEach((elem) => {
      const minPatientInfo: MinPatientInfoInterface = this.makeMinPatientInfoObj(elem);
      if (minPatientInfo.AMDType === "wet") {
        AMDWet.push(minPatientInfo);
      } else {
        AMDDry.push(minPatientInfo);
      }
    });

    return { injectionDate: AMDWet, nextInspectionDate: AMDDry };
  }

  async getCurrentDatePatientsList(): Promise<{
    injectionDate: MinPatientInfoInterface[];
    nextInspectionDate: MinPatientInfoInterface[];
  }> {
    const AMDWet: MinPatientInfoInterface[] = [];
    const AMDDry: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date(), "DD.MM.YYYY");
    const medicalExams = await this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: Equal(currentDate), nextInspectionDate: Equal(currentDate) }],
    });

    medicalExams.forEach((elem) => {
      const minPatientInfo = this.makeMinPatientInfoObj(elem);
      if (minPatientInfo.AMDType === "wet") {
        AMDWet.push(minPatientInfo);
      } else {
        AMDDry.push(minPatientInfo);
      }
    });

    return { injectionDate: AMDWet, nextInspectionDate: AMDDry };
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
