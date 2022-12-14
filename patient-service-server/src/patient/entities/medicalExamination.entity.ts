import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
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

  @ManyToOne(
    () => PatientEntity,
    (patient: PatientEntity) => patient.medicalExcaminations,
  )
  patient: PatientEntity;
}
