import { PatientEntity } from "../patient/entities/patient.entity";

export interface NextWeekPatientsInterface {
  injectionDate: PatientEntity[];
  nextInspectionDate: PatientEntity[];
}
