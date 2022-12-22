import { Module } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { TomographyEntity } from "./entities/tomography.entity";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { ConfigModule } from "@nestjs/config";
import { MedicalExaminationService } from "./medicalExamination.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity, MedicalExaminationEntity, TomographyEntity]),
    ConfigModule,
  ],
  providers: [PatientService, MedicalExaminationService],
  controllers: [PatientController],
})
export class PatientModule {}
