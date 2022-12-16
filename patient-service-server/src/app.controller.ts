import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { PatientService } from "./patient/patient.service";
import { CreatePatientDto } from "./patient/dto/createPatient.dto";
import { PatientEntity } from "./patient/entities/patient.entity";
import { AllPatientsInfoInterface } from "./interfaces/allPatientsInfo.interface";
import { UpdateCardDto } from "./patient/dto/updateCard.dto";

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

  @Post("/:id/update")
  async updatePatientCard(@Body() update: UpdateCardDto, @Param() params): Promise<PatientEntity> {
    return this.patientService.updatePatientCard(update, parseInt(params.id));
  }

  @Get("/:id")
  async getPatientById(@Param() params): Promise<PatientEntity> {
    return this.patientService.getPatientById(parseInt(params.id));
  }
}
