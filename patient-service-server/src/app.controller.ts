import { Body, Controller, Get, Param, Post, HttpCode, Delete, Logger } from "@nestjs/common";
import { AppService } from "./app.service";
import { PatientService } from "./patient/patient.service";
import { CreatePatientDto } from "./patient/dto/createPatient.dto";
import { PatientEntity } from "./patient/entities/patient.entity";
import { AllPatientsInfoInterface } from "./interfaces/allPatientsInfo.interface";
import { UpdateCardDto } from "./patient/dto/updateCard.dto";
import { NextWeekPatientsInterface } from "./interfaces/nextWeekPatients.interface";
import { MedicalExaminationService } from "./patient/medicalExamination.service";
import { MedicalExaminationEntity } from "./patient/entities/medicalExamination.entity";
const moment = require("moment");

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly patientService: PatientService,
    private readonly medicalExaminationService: MedicalExaminationService,
  ) {}

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

  @Post("/find-by-surname")
  async findBySurname(@Body() surnameInfo): Promise<PatientEntity[]> {
    return this.patientService.findPatientBySurname(surnameInfo.surname);
  }

  @Get("/check-next-week")
  async getAllSickPatients(): Promise<NextWeekPatientsInterface> {
    return this.patientService.checkNextWeekPatients();
  }

  // @Get("/missed-examinations")
  // async getMissedExaminationPatients() {
  //   return this.medicalExaminationService.checkMissedInjection();
  // }

  @Post("/:id/update")
  async updatePatientCard(@Body() update: UpdateCardDto, @Param() params): Promise<PatientEntity> {
    return this.patientService.updatePatientCard(update, parseInt(params.id));
  }

  @Get("/:id")
  async getPatientById(@Param() params): Promise<PatientEntity> {
    console.log(await this.medicalExaminationService.getAllMedExaminations());
    return this.patientService.getPatientById(parseInt(params.id));
  }

  // @Get("/allmedexam")
  // async getAllMedExams(): Promise<MedicalExaminationEntity[]> {
  //   try {
  //     return this.medicalExaminationService.getAllMedExaminations();
  //   } catch (err) {
  //     Logger.error("Error");
  //   }
  // }

  @Get("/:id/medexam")
  async getMedExamById(@Param() params) {
    return this.medicalExaminationService.getMedExamByPatientId(parseInt(params.id));
  }

  @Delete("/delete/:id")
  async deletePatient(@Param() params): Promise<void> {
    await this.patientService.deletePatient(parseInt(params.id));
  }
}
