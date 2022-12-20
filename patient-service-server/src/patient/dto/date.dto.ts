import { IsString } from "class-validator";

export class DateDto {
  @IsString()
  date: string;
}
