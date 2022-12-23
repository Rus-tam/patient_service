import { MinPatientInfoInterface } from "./minPatientInfo.interface";

export interface PatientListInterface {
  injectionDate: MinPatientInfoInterface[];
  nextInspectionDate: MinPatientInfoInterface[];
}
