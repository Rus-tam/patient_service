import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { PatientListInterface } from "./interfaces/patientList.interface";

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
  async getMissedList(): Promise<PatientListInterface> {
    return this.appService.getMissedPatientList();
  }
}
