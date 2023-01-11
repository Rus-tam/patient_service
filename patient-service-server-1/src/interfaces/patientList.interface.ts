import { MinPatientInfoInterface } from "./minPatientInfo.interface";

export interface PatientListInterface {
  nextInjectionDate: MinPatientInfoInterface[];
  nextInspectionDate: MinPatientInfoInterface[];
}
