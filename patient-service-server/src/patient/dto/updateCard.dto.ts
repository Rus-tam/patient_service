import { IsDate, IsPhoneNumber, IsString } from "class-validator";

export class UpdateCardDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  AMDType: string;

  @IsString()
  visualAcuity: string;

  @IsDate()
  injectionDate: Date;

  @IsDate()
  nextInspectionDate: Date;

  @IsString()
  healthStatus: string;
}
