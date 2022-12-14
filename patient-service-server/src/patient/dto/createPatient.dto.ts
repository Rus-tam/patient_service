import { IsString, isString, IsDate, IsBoolean } from 'class-validator';
import { MedicalExaminationEntity } from '../entities/medicalExamination.entity';

export class CreatePatientDto {
  @IsString()
  patientName: string;

  @IsDate()
  patientBirthDate: Date;

  @IsBoolean()
  AMDType: boolean;

  @IsString()
  visualAcuity: string;
}
