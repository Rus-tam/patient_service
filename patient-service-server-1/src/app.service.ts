import { Injectable } from "@nestjs/common";
import { MedicalExaminationService } from "./patient/medicalExamination.service";
import { PatientListInterface } from "./interfaces/patientList.interface";
import { MinPatientInfoInterface } from "./interfaces/minPatientInfo.interface";
import { MedicalExaminationEntity } from "./patient/entities/medicalExamination.entity";
import { spawn } from "child_process";
import { PatientService } from "./patient/patient.service";
import { PatientEntity } from "./patient/entities/patient.entity";
const moment = require("moment");

@Injectable()
export class AppService {
  constructor(
    private readonly medicalExaminationsService: MedicalExaminationService,
    private readonly patientService: PatientService,
  ) {}

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

  async getMissedPatientList() {
    const missedPatients: PatientEntity[] = [];
    const AMDWet: MinPatientInfoInterface[] = [];
    const AMDDry: MinPatientInfoInterface[] = [];

    const allPatients = await this.patientService.getAllPatientCards();
    const examIds = [];
    const lastExams: MedicalExaminationEntity[] = [];
    allPatients.forEach((patient) => {
      let examId = 0;
      patient.medicalExaminations.forEach((exam) => {
        exam.id > examId ? (examId = exam.id) : null;
      });
      examIds.push(examId);
    });
    for (let id of examIds) {
      const lastExam = await this.medicalExaminationsService.getById(id);
      if (
        moment(new Date()).isAfter(lastExam.injectionDate) ||
        moment(new Date()).isAfter(lastExam.nextInspectionDate)
      ) {
        const minPatientInfo = this.makeMinPatientInfoObj(lastExam);
        if (minPatientInfo.AMDType === "wet") {
          AMDWet.push(minPatientInfo);
        } else {
          AMDDry.push(minPatientInfo);
        }
        lastExams.push(lastExam);
      }
    }

    return { injectionDate: AMDWet, nextInspectionDate: AMDDry };
  }

  async sendMessageToWhatsapp(patientInfo: MinPatientInfoInterface[], date: string) {
    let name: string = "";
    let surname: string = "";
    let patronymic: string = "";
    let phone: string = "";
    let FIO: string = "";

    patientInfo.forEach((patient) => {
      phone += patient.phone + ",";
      FIO += `${patient.name}` + " " + `${patient.patronymic}` + ",";
    });

    const FIOtotal = Buffer.from(FIO, "utf-8").toString();

    const process: any = spawn("python", ["./src/python/script.py", FIOtotal, phone, date]);

    process.stdout.on("data", (data) => {
      console.log("typescript data", data.toString());
    });

    process.stderr.on("data", (data) => {
      console.log("stderr", data.toString());
    });

    process.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  makeMinPatientInfoObj(medExam: MedicalExaminationEntity): MinPatientInfoInterface {
    return {
      id: medExam.patient.id,
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
