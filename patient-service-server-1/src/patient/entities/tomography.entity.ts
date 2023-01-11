import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientEntity } from "./patient.entity";

@Entity()
export class TomographyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdDate: Date;

  @Column()
  fileName: string;

  @Column({ type: "bytea" })
  image: Uint8Array;

  @ManyToOne(() => PatientEntity, (patient: PatientEntity) => patient.tomography, {
    onDelete: "CASCADE",
    orphanedRowAction: "delete",
  })
  patient: PatientEntity;

  @DeleteDateColumn()
  public deletedAt: Date;
}
