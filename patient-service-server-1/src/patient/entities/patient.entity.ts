import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { DeleteDateColumn } from 'typeorm';
import { MedicalExaminationEntity } from './medicalExamination.entity';
import { TomographyEntity } from './tomography.entity';

@Entity()
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  patronymic: string;

  @Column({ type: 'date' })
  patientBirthDate: Date;

  @Column()
  phone: string;

  @OneToMany(
    () => MedicalExaminationEntity,
    (medicalExaminations) => medicalExaminations.patient,
  )
  medicalExaminations: MedicalExaminationEntity[];

  @OneToMany(() => TomographyEntity, (tomography) => tomography.patient)
  tomography: TomographyEntity[];

  @Column()
  missedInjection: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn()
  public deletedAt: Date;
}
