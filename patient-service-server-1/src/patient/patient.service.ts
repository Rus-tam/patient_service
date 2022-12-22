import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { Repository } from "typeorm";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";
import { PatientError } from "../errors/patient.error";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async createPatientCard(cardData: CreatePatientCardDto) {
    // Проверяем нет ли в базе карточки пациента
    const existingPatient = await this.patientRepository.find({
      where: [
        {
          phone: cardData.phone,
          name: cardData.name,
          surname: cardData.surname,
        },
      ],
    });
    if (existingPatient[0]) {
      Logger.error("There is patient with such name and phone number");
      throw new ConflictException(PatientError.DuplicatePatientData);
    }

    const newCard = this.patientRepository.create({
      name: cardData.name,
      surname: cardData.surname,
      patronymic: cardData.patronymic,
      patientBirthDate: cardData.patientBirthDate,
      phone: cardData.phone,
      medicalExaminations: [],
      tomography: [],
      missedInjection: false,
      createdAt: new Date(),
      updatedAt: null,
    });

    await this.patientRepository.save(newCard);

    return newCard;
  }
}
