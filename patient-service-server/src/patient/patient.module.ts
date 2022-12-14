import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { MedicalExaminationEntity } from './entities/medicalExamination.entity';
import { TomographyEntity } from './entities/tomography.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientEntity,
      MedicalExaminationEntity,
      TomographyEntity,
    ]),
    ConfigModule,
  ],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
