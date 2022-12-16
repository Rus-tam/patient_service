import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { PatientService } from "./patient/patient.service";
import { CreatePatientDto } from "./patient/dto/createPatient.dto";
import { PatientEntity } from "./patient/entities/patient.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly patientService: PatientService) {}

  @Post("/new-patient")
  async createPatient(@Body() patientData: CreatePatientDto): Promise<PatientEntity> {
    return this.patientService.createPatient(patientData);
  }
}
