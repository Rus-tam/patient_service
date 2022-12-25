import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { MedicalExaminationService } from "./medicalExamination.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { TomographyService } from "./tomography.service";
import { ExaminationResultsInterface } from "../interfaces/examinationResults.interface";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";

@Controller("patient")
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly medicalExaminationService: MedicalExaminationService,
    private readonly tomographyService: TomographyService,
  ) {}

  @Post("/create")
  async createNewCard(@Body() cardInfo: CreatePatientCardDto): Promise<PatientEntity> {
    return this.patientService.createPatientCard(cardInfo);
  }

  @Get("/cards")
  async getAllPatientsCards(): Promise<PatientEntity[]> {
    return this.patientService.getAllPatientCards();
  }

  @Get("/surname/:surname")
  async getPatientBySurname(@Param("surname") surname: string): Promise<MinPatientInfoInterface[]> {
    return this.patientService.getPatientBySurname(surname);
  }

  // Временно потом удалить
  @Get("/all-med-exam")
  async getAllMedExams() {
    console.log(await this.medicalExaminationService.getAllMedExaminations());
    return this.medicalExaminationService.getAllMedExaminations();
  }

  @Get("/:id")
  async getPatientById(@Param("id") id: number) {
    return this.patientService.getPatientById(id);
  }

  @Post("/:id/examinations")
  async createNewExamination(
    @Param("id") id: number,
    @Body() examination: MedicalExaminationDto,
  ): Promise<MedicalExaminationEntity> {
    const patientCard = await this.patientService.getPatientById(id);
    const medicalExam = await this.medicalExaminationService.createMedicalExamination(
      examination,
      patientCard,
    );

    return medicalExam;
  }

  @Post("/:id/tomography")
  @UseInterceptors(FileInterceptor("file"))
  async createNewTomographyPic(@Param("id") id: number, @UploadedFile() file: Express.Multer.File) {
    const patientCard = await this.patientService.getPatientById(id);

    console.log(id);
    console.log(file);

    return this.tomographyService.createTomographyPic(file, patientCard);
  }
}
