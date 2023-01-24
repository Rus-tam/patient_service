import { ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientEntity } from "./entities/patient.entity";
import { Repository } from "typeorm";
import { CreatePatientCardDto } from "./dto/createPatientCard.dto";
import { PatientError } from "../errors/patient.error";
import { MinPatientInfoInterface } from "../interfaces/minPatientInfo.interface";
import { UpdateResult } from "typeorm";
const moment = require("moment");

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
      kinsmenPhone: cardData.kinsmenPhone,
      medicalExaminations: [],
      tomography: [],
      createdAt: new Date(),
      updatedAt: null,
      lastVisit: null,
    });

    await this.patientRepository.save(newCard);

    return newCard;
  }

  async updatePatientCard(id: number, update: CreatePatientCardDto): Promise<UpdateResult> {
    return this.patientRepository.update(id, update);
  }

  async getAllPatientCards(): Promise<PatientEntity[]> {
    const patientCards = await this.patientRepository.find({
      relations: ["medicalExaminations"],
    });

    if (patientCards.length > 0) {
      return patientCards;
    } else {
      Logger.error("There is no one patient card in database");
      throw new NotFoundException(PatientError.NotFound);
    }
  }

  async getAllPatientsCardsMin(): Promise<PatientEntity[]> {
    return await this.patientRepository.find();
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

  async setLastVisit(id: number): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    patient.lastVisit = moment(new Date(), "YYYY-MM-DD").toDate();

    await this.patientRepository.save(patient);
    return patient;
  }

  async deletePatient(id: number) {
    await this.patientRepository.delete({ id });
  }
}
