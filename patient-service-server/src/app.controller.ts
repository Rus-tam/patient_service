import { Body, Controller, Get, Param, Post, HttpCode } from "@nestjs/common";
import { AppService } from "./app.service";
import { PatientService } from "./patient/patient.service";
import { CreatePatientDto } from "./patient/dto/createPatient.dto";
import { PatientEntity } from "./patient/entities/patient.entity";
import { AllPatientsInfoInterface } from "./interfaces/allPatientsInfo.interface";
import { UpdateCardDto } from "./patient/dto/updateCard.dto";
import { DateDto } from "./patient/dto/date.dto";
import { type } from "os";
const moment = require("moment");

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly patientService: PatientService) {}

  @Post("/new-patient")
  async createPatient(@Body() patientData: CreatePatientDto): Promise<PatientEntity> {
    return this.patientService.createPatient(patientData);
  }

  @Get("/all-patients")
  async getAllPatientsInfo(): Promise<AllPatientsInfoInterface[]> {
    return this.patientService.getAllPatients();
  }

  // @Get("/all-patients/sick")
  // async getAllSickPatients(): Promise<PatientEntity[]> {
  //   return this.patientService.getAllSickPatients();
  // }

  @Post("/check-next-week")
  async getAllSickPatients(@Body() dateObj: DateDto) {
    const date = dateObj.date;
    const parsedDate = moment(date, "DD.MM.YYYY").format();
    return this.patientService.checkNextWeekPatients(new Date(parsedDate));
    // console.log(date);
    // console.log(new Date(parsedDate));
  }

  @Post("/:id/update")
  async updatePatientCard(@Body() update: UpdateCardDto, @Param() params): Promise<PatientEntity> {
    return this.patientService.updatePatientCard(update, parseInt(params.id));
  }

  @Get("/:id")
  async getPatientById(@Param() params): Promise<PatientEntity> {
    return this.patientService.getPatientById(parseInt(params.id));
  }

  @Get("/all-patients/healthy")
  async getAllHealthyPatients(): Promise<PatientEntity[]> {
    return this.patientService.getAllHealthyPatients();
  }
}
