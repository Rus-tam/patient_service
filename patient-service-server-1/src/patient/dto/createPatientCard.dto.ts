import { IsString, IsDate, IsPhoneNumber, IsBoolean } from "class-validator";

export class CreatePatientCardDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  patronymic: string;

  @IsDate()
  patientBirthDate: Date;

  @IsPhoneNumber()
  phone: string;

  @IsPhoneNumber()
  kinsmenPhone: string;
}
