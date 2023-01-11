import { IsDate, IsString } from "class-validator";

export class MedicalExaminationDto {
  @IsString()
  AMDType: string;

  @IsString()
  visualAcuity: string;

  @IsDate()
  nextInjectionDate: Date;

  @IsDate()
  nextInspectionDate: Date;

  @IsDate()
  injectionDate: Date;

  @IsString()
  drugName: string;

  @IsString()
  examinationResult: string;

  @IsString()
  formOfDisease: string;

  @IsString()
  VEGFTherapyHistory: string;
}
