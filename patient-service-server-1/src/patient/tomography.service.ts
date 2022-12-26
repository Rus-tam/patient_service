import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TomographyEntity } from "./entities/tomography.entity";
import { MedicalExaminationDto } from "./dto/medicalExamination.dto";
import { PatientEntity } from "./entities/patient.entity";

@Injectable()
export class TomographyService {
  constructor(
    @InjectRepository(TomographyEntity)
    private tomographyRepository: Repository<TomographyEntity>,
  ) {}

  async createTomographyPic(file: Express.Multer.File, patient: PatientEntity) {
    const newTomography = this.tomographyRepository.create({
      fileName: file.originalname,
      createdDate: new Date(),
      image: file.buffer,
      patient,
    });

    await this.tomographyRepository.save(newTomography);

    return newTomography;
  }

  async getTomographyFileById(id: number): Promise<TomographyEntity> {
    return this.tomographyRepository.findOne({ where: { id } });
  }
}
