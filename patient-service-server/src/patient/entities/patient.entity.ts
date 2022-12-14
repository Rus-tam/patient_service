import { Column, PrimaryColumn, Entity, OneToMany } from 'typeorm';
import { DeleteDateColumn } from 'typeorm';
import { MedicalExaminationEntity } from './medicalExamination.entity';

@Entity()
export class PatientEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  patientBirthDate: Date;

  @Column()
  AMD: boolean;

  @Column()
  visualAcuity: string;

  // @Column()
  // medicalExamination: string;

  @OneToMany(
    () => MedicalExaminationEntity,
    (medicalExaminations) => medicalExaminations.patient,
  )
  medicalExcaminations: MedicalExaminationEntity[];

  @Column()
  injectionDate: Date;

  @Column()
  missedInjection: boolean;

  @DeleteDateColumn()
  public deletedAt: Date;
}
