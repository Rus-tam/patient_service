import { IsString, IsDate, IsBoolean, IsPhoneNumber } from "class-validator";

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  patronymic: string;

  @IsDate()
  patientBirthDate: Date;

  @IsPhoneNumber()
  phoneNumber: string;
}
