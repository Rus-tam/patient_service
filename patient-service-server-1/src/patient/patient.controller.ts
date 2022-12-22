import { Controller, Post, Body } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";

@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post("/create")
  async createNewCard(@Body() cardInfo: CreatePatientCardDto) {
    return this.patientService.createPatientCard(cardInfo);
  }
}
