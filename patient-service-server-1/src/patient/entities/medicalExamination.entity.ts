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
  visualAcuityOD: string;

  @Column()
  visualAcuityOS: string;

  @Column()
  tonometryOD: string;

  @Column()
  tonometryOS: string;

  @Column()
  refractometryODsph: string;

  @Column()
  refractometryODcyl: string;

  @Column()
  refractometryODax: string;

  @Column()
  refractometryOSsph: string;

  @Column()
  refractometryOScyl: string;

  @Column()
  refractometryOSax: string;

  @Column()
  biomicroscopyOD: string;

  @Column()
  biomicroscopyOS: string;

  @Column()
  eyeBottomOD: string;

  @Column()
  eyeBottomOS: string;

  @Column()
  additionalExamOD: string;

  @Column()
  additionalExamOS: string;

  @Column({ type: "date", nullable: true })
  nextInjectionDate: Date | null;

  @Column({ type: "time", nullable: true })
  nextInjectionTime: Date | null;

  @Column({ type: "date", nullable: true })
  nextInspectionDate: Date | null;

  @Column({ type: "time", nullable: true })
  nextInspectionTime: Date | null;

  @Column({ type: "date", nullable: true })
  injectionDate: Date | null;

  @Column({ nullable: true })
  drugName: string | null;

  @Column({ type: "text" })
  examinationResult: string;

  @Column({ nullable: true })
  formOfDisease: string;

  @Column({ nullable: true, type: "text" })
  VEGFTherapyHistory: string;

  @ManyToOne(() => PatientEntity, (patient: PatientEntity) => patient.medicalExaminations, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  patient: PatientEntity;

  @DeleteDateColumn()
  public deletedAt: Date;
}
