import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { Repository } from "typeorm";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";
import { PatientError } from "../errors/patient.error";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async createPatientCard(cardData: CreatePatientCardDto): Promise<PatientEntity> {
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
      name: cardData.name.toUpperCase(),
      surname: cardData.surname.toUpperCase(),
      patronymic: cardData.patronymic.toUpperCase(),
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

  async getAllPatientCards(): Promise<PatientEntity[]> {
    const patientCards = await this.patientRepository.find({
      relations: ["medicalExaminations", "tomography"],
    });

    if (patientCards.length > 0) {
      return patientCards;
    } else {
      Logger.error("There is no one patient card in database");
      throw new NotFoundException(PatientError.NotFound);
    }
  }

  async getPatientBySurname(surname: string): Promise<MinPatientInfoInterface[]> {
    const minPatientsInfo: MinPatientInfoInterface[] = [];
    const patients = await this.patientRepository.find({
      where: { surname: surname.toUpperCase() },
    });

    patients.forEach((patient) => {
      minPatientsInfo.push({
        id: patient.id,
        name: patient.name,
        surname: patient.surname,
        patronymic: patient.patronymic,
        patientBirthDate: patient.patientBirthDate,
        phone: patient.phone,
      });
    });

    return minPatientsInfo;
  }

  async getPatientById(id: number): Promise<PatientEntity> {
    return this.patientRepository.findOne({
      where: { id },
      relations: ["medicalExaminations", "tomography"],
    });
  }
}
