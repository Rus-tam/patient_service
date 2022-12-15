import { IsString, IsDate, IsBoolean, IsPhoneNumber } from "class-validator";

export class CreatePatientDto {
  @IsString()
  patientName: string;

  @IsDate()
  patientBirthDate: Date;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsBoolean()
  AMDType: boolean;
}
