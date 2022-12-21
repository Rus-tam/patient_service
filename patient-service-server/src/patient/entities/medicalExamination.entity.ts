import { Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, Entity } from "typeorm";
import { PatientEntity } from "./patient.entity";

@Entity()
export class MedicalExaminationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdDate: Date;

  @Column({ type: "text" })
  examinationResult: string;

  @ManyToOne(() => PatientEntity, (patient: PatientEntity) => patient.medicalExaminations)
  patient: PatientEntity;

  @DeleteDateColumn()
  public deletedAt: Date;
}
