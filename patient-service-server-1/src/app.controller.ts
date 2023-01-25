import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { PatientListInterface } from "./interfaces/patientList.interface";
import { MinPatientInfoInterface } from "./interfaces/minPatientInfo.interface";
const moment = require("moment");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("check/seven-days-list")
  async getSevenDaysList(): Promise<PatientListInterface> {
    return this.appService.sevenDaysPatientList();
  }

  @Get("check/current-date-list")
  async getCurrentDateList(): Promise<PatientListInterface> {
    return this.appService.getCurrentDatePatientsList();
  }

  @Get("check/get-missed-list")
  async getMissedList() {
    return this.appService.getMissedPatientList();
  }

  @Get("send-message")
  async sendMessage() {
    const patientsList = await this.appService.sevenDaysPatientList();
    const patients = [...patientsList.nextInjectionDate, ...patientsList.nextInspectionDate];
    const plusSevenDays = moment(new Date()).add(7, "days").format("DD-MM-YYYY").toString();
    await this.appService.sendMessageToWhatsapp(patients, plusSevenDays);
  }
}
