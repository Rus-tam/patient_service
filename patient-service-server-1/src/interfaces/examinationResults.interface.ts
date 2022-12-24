import { MedicalExaminationEntity } from "../patient/entities/medicalExamination.entity";
import { TomographyEntity } from "../patient/entities/tomography.entity";

export interface ExaminationResultsInterface {
  medicalExam: MedicalExaminationEntity;
  tomography: TomographyEntity;
}
