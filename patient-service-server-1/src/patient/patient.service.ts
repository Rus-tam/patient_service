import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientCardDto } from './dto/createPatientCard.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async createPatientCard(cardData: CreatePatientCardDto) {}
}
