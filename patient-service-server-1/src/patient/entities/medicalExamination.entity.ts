import { Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, Entity } from "typeorm";
import { PatientEntity } from "./patient.entity";

@Entity()
export class MedicalExaminationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  AMDType: string;

  @Column()
  visualAcuity: string;

  @Column({ type: "date", nullable: true })
  injectionDate: Date | null;

  @Column({ type: "date", nullable: true })
  nextInspectionDate: Date | null;

  @Column({ type: "text" })
  examinationResult: string;

  @Column({ nullable: true })
  formOfDisease: string;

  @Column({ nullable: true, type: "text" })
  VEGFTherapyHistory: string;

  @ManyToOne(() => PatientEntity, (patient: PatientEntity) => patient.medicalExaminations)
  patient: PatientEntity;

  @DeleteDateColumn()
  public deletedAt: Date;
}
