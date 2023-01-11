import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { DeleteDateColumn } from "typeorm";
import { MedicalExaminationEntity } from "./medicalExamination.entity";
import { TomographyEntity } from "./tomography.entity";

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

  @Column({ type: "date" })
  patientBirthDate: Date;

  @Column()
  phone: string;

  @Column({ nullable: true })
  kinsmenPhone: string;

  @OneToMany(() => MedicalExaminationEntity, (medicalExaminations) => medicalExaminations.patient, {
    cascade: ["remove"],
  })
  medicalExaminations: MedicalExaminationEntity[];

  @OneToMany(() => TomographyEntity, (tomography) => tomography.patient, { cascade: ["remove"] })
  tomography: TomographyEntity[];

  @Column({ nullable: true })
  lastVisit: Date | null;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn()
  public deletedAt: Date;
}
