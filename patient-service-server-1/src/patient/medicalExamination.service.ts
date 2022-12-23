import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { LessThanOrEqual, Repository, LessThan } from "typeorm";
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

  async checkMissedInjection(): Promise<MinPatientInfoInterface[]> {
    const patients: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date(), "DD.MM.YYYY");
    const missedMedExam = await this.medicalExaminationRepository.find({
      relations: ["patient"],
      where: [{ injectionDate: LessThan(currentDate), nextInspectionDate: LessThan(currentDate) }],
    });

    missedMedExam.forEach((elem) =>
      patients.push({
        name: elem.patient.name,
        surname: elem.patient.surname,
        patronymic: elem.patient.patronymic,
        patientBirthDate: elem.patient.patientBirthDate,
        phone: elem.patient.phone,
        AMDType: elem.AMDType,
        injectionDate: elem.injectionDate,
        nextInspectionDate: elem.nextInspectionDate,
      }),
    );

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
      const minPatientInfo: MinPatientInfoInterface = {
        name: elem.patient.name,
        surname: elem.patient.surname,
        patronymic: elem.patient.patronymic,
        patientBirthDate: elem.patient.patientBirthDate,
        phone: elem.patient.phone,
        AMDType: elem.AMDType,
        injectionDate: elem.injectionDate,
        nextInspectionDate: elem.nextInspectionDate,
      };
      if (minPatientInfo.AMDType === "wet") {
        AMDWet.push(minPatientInfo);
      } else {
        AMDDry.push(minPatientInfo);
      }
    });

    return { injectionDate: AMDWet, nextInspectionDate: AMDDry };
  }
}
