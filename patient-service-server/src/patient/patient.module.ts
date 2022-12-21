import { Module } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { MedicalExaminationEntity } from "./entities/medicalExamination.entity";
import { TomographyEntity } from "./entities/tomography.entity";
import { MedicalExaminationService } from "./medicalExamination.service";

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity, MedicalExaminationEntity, TomographyEntity]), ConfigModule],
  providers: [PatientService, MedicalExaminationService],
  exports: [PatientService, MedicalExaminationService],
})
export class PatientModule {}
