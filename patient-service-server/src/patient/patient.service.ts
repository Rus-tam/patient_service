import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from './entities/patient.entity';
import { CreatePatientDto } from './dto/createPatient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  async createPatient(patientData: CreatePatientDto) {
    // Проверяем нет ли в базе данных повторяющихся пациентов
  }
}
