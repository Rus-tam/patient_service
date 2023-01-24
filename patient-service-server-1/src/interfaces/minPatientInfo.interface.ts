export interface MinPatientInfoInterface {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  patientBirthDate: Date;
  phone: string;
  kinsmenPhone?: string;
  AMDType?: string;
  nextInjectionDate?: Date;
  nextInspectionDate?: Date;
  nextInjectionTime?: Date;
  nextInspectionTime?: Date;
}
