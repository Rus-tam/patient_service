import { IsDate, IsString } from "class-validator";
import { Column } from "typeorm";

export class MedicalExaminationDto {
  @IsString()
  AMDType: string;

  @IsString()
  visualAcuityOD: string;

  @IsString()
  visualAcuityOS: string;

  @IsString()
  tonometryOD: string;

  @IsString()
  tonometryOS: string;

  @IsString()
  refractometryODsph: string;

  @IsString()
  refractometryODcyl: string;

  @IsString()
  refractometryODax: string;

  @IsString()
  refractometryOSsph: string;

  @IsString()
  refractometryOScyl: string;

  @IsString()
  refractometryOSax: string;

  @IsString()
  biomicroscopyOD: string;

  @IsString()
  biomicroscopyOS: string;

  @IsString()
  eyeBottomOD: string;

  @IsString()
  eyeBottomOS: string;

  @IsString()
  additionalExamOD: string;

  @IsString()
  additionalExamOS: string;

  @IsDate()
  nextInjectionDate: Date;

  @IsString()
  nextInjectionTime: string;

  @IsDate()
  nextInspectionDate: Date;

  @IsString()
  nextInspectionTime: string;

  @IsString()
  clinicAddress: string;

  @IsString()
  phoneForInformation: string;

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
