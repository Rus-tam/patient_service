import { Injectable } from "@nestjs/common";
import { MedicalExaminationService } from "./patient/medicalExamination.service";
import { PatientListInterface } from "./interfaces/patientList.interface";
import { MinPatientInfoInterface } from "./interfaces/minPatientInfo.interface";
import { MedicalExaminationEntity } from "./patient/entities/medicalExamination.entity";
import { Equal, LessThan } from "typeorm";
const moment = require("moment");

@Injectable()
export class AppService {
  constructor(private readonly medicalExaminationsService: MedicalExaminationService) {}

  async sevenDaysPatientList(): Promise<PatientListInterface> {
    const AMDWet: MinPatientInfoInterface[] = [];
    const AMDDry: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date()).format("DD.MM.YYYY");
    const plusSevenDays = moment(currentDate, "DD.MM.YYYY").add(7, "days").toDate();
    const medicalExaminations = await this.medicalExaminationsService.findByDates(
      plusSevenDays,
      plusSevenDays,
    );
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

  async getCurrentDatePatientsList(): Promise<PatientListInterface> {
    const AMDWet: MinPatientInfoInterface[] = [];
    const AMDDry: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date(), "DD.MM.YYYY").toDate();
    const medicalExams = await this.medicalExaminationsService.findByCurrentDates(currentDate);
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

  async getMissedPatientList(): Promise<MinPatientInfoInterface[]> {
    const patients: MinPatientInfoInterface[] = [];
    const currentDate = moment(new Date(), "DD.MM.YYYY").toDate();
    const missedMedExam = await this.medicalExaminationsService.findByMissedDates(currentDate);
    missedMedExam.forEach((elem) => patients.push(this.makeMinPatientInfoObj(elem)));

    return patients;
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
