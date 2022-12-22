import { IsDate, IsString } from "class-validator";

export class MedicalExaminationDto {
  @IsString()
  AMDType: string;

  @IsString()
  visualAcuity: string;

  @IsDate()
  injectionDate: Date;

  @IsDate()
  nextInspectionDate: Date;

  @IsString()
  examinationResult: string;
}
