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
  AMD: boolean;

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
  missedInjection: boolean;

  @DeleteDateColumn()
  public deletedAt: Date;
}
