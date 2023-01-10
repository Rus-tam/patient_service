import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  Put,
} from "@nestjs/common";
import { PatientService } from "./patient.service";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { MedicalExaminationService } from "./medicalExamination.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { TomographyService } from "./tomography.service";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { Readable } from "stream";
import { Response } from "express";

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

  @Get("/cards-min-info")
  async getAllPatientsCardsMin(): Promise<PatientEntity[]> {
    return this.patientService.getAllPatientsCardsMin();
  }

  @Get("/surname/:surname")
  async getPatientBySurname(@Param("surname") surname: string): Promise<MinPatientInfoInterface[]> {
    return this.patientService.getPatientBySurname(surname);
  }

  @Get("/tomography/:tomogrId/download")
  async downLoadTomographyFile(
    @Param("tomogrId") tomogrId: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const tomography = await this.tomographyService.getTomographyFileById(tomogrId);
    const file = tomography.image;

    const stream = Readable.from(file);
    response.set({
      "Content-Disposition": `inline; filename="${tomography.fileName}"`,
      "Content-Type": "octet-stream",
    });

    return new StreamableFile(stream);
  }

  // Временно потом удалить
  @Get("/all-med-exam")
  async getAllMedExams() {
    console.log(await this.medicalExaminationService.getAllMedExaminations());
    return this.medicalExaminationService.getAllMedExaminations();
  }

  @Put("med-exam/:id/update")
  async updateMedExamById(@Param("id") id: number, @Body() update: MedicalExaminationDto) {
    return this.medicalExaminationService.updateMedExam(id, update);
  }

  @Get("med-exam/:id")
  async getMedExamById(@Param("id") id: number): Promise<MedicalExaminationEntity> {
    return this.medicalExaminationService.getById(id);
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
    // const patientCard = await this.patientService.getPatientById(id);
    const patientCard = await this.patientService.setLastVisit(id);
    return this.medicalExaminationService.createMedicalExamination(examination, patientCard);
  }

  @Post("/:id/tomography")
  @UseInterceptors(FileInterceptor("file"))
  async createNewTomographyPic(@Param("id") id: number, @UploadedFile() file: Express.Multer.File) {
    const patientCard = await this.patientService.getPatientById(id);
    console.log(file);

    return this.tomographyService.createTomographyPic(file, patientCard);
  }
}
