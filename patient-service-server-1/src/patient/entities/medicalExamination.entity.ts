import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
  Entity,
} from 'typeorm';
import { PatientEntity } from './patient.entity';

@Entity()
export class MedicalExaminationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdDate: Date;

  @Column()
  AMDType: string;

  @Column()
  visualAcuity: string;

  @Column({ type: 'date', nullable: true })
  injectionDate: Date | null;

  @Column({ type: 'date' })
  nextInspectionDate: Date;

  @Column({ type: 'text' })
  examinationResult: string;

  @ManyToOne(
    () => PatientEntity,
    (patient: PatientEntity) => patient.medicalExaminations,
  )
  patient: PatientEntity;

  @DeleteDateColumn()
  public deletedAt: Date;
}
