import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { MedicalExaminationService } from "./medicalExamination.service";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";

@Controller("patient")
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly medicalExaminationService: MedicalExaminationService,
  ) {}

  @Post("/create")
  async createNewCard(@Body() cardInfo: CreatePatientCardDto): Promise<PatientEntity> {
    return this.patientService.createPatientCard(cardInfo);
  }

  @Get("/cards")
  async getAllPatientsCards(): Promise<PatientEntity[]> {
    return this.patientService.getAllPatientCards();
  }

  @Get("/check")
  async checkSevenDaysPatients() {
    console.log(await this.medicalExaminationService.checkSevenDaysPatientList());
    return this.medicalExaminationService.checkSevenDaysPatientList();
  }

  // Временно потом удалить
  @Get("/all-med-exam")
  async getAllMedExams() {
    console.log(await this.medicalExaminationService.getAllMedExaminations());
    return this.medicalExaminationService.getAllMedExaminations();
  }

  @Get("missed-examinations")
  async getMissedInjectionPatients(): Promise<MinPatientInfoInterface[]> {
    return this.medicalExaminationService.checkMissedInjection();
  }

  @Get("/:id")
  async getPatientById(@Param("id") id: number) {
    return this.patientService.getPatientById(id);
  }

  @Post("/:id/examinations")
  async createNewExamination(@Param("id") id: number, @Body() examination: MedicalExaminationDto) {
    const patientCard = await this.patientService.getPatientById(id);

    return this.medicalExaminationService.newMedicalExamination(examination, patientCard);
  }
}
