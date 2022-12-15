import { Column, PrimaryColumn, Entity, OneToMany } from 'typeorm';
import { DeleteDateColumn } from 'typeorm';
import { MedicalExaminationEntity } from './medicalExamination.entity';
import { TomographyEntity } from './tomography.entity';

@Entity()
export class PatientEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  patientBirthDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  AMDType: string;

  @Column()
  visualAcuity: string;

  @OneToMany(
    () => MedicalExaminationEntity,
    (medicalExaminations) => medicalExaminations.patient,
  )
  medicalExaminations: MedicalExaminationEntity[];

  @OneToMany(() => TomographyEntity, (tomography) => tomography.patient)
  tomography: TomographyEntity[];

  @Column()
  injectionDate: Date;

  @Column()
  nextInspection: Date;

  @Column()
  missedInjection: boolean;

  @Column()
  createdAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
