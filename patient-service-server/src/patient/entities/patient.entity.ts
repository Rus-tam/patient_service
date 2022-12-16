import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { DeleteDateColumn } from "typeorm";
import { MedicalExaminationEntity } from "./medicalExamination.entity";
import { TomographyEntity } from "./tomography.entity";

@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column({ type: "date" })
  patientBirthDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  AMDType: string;

  @Column()
  visualAcuity: string;

  @OneToMany(() => MedicalExaminationEntity, (medicalExaminations) => medicalExaminations.patient)
  medicalExaminations: MedicalExaminationEntity[];

  @OneToMany(() => TomographyEntity, (tomography) => tomography.patient)
  tomography: TomographyEntity[];

  @Column({ type: "date" })
  injectionDate: Date;

  @Column({ type: "date" })
  nextInspectionDate: Date;

  @Column()
  missedInjection: boolean;

  @Column()
  healthStatus: string;

  @Column()
  createdAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
