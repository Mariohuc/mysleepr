import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { ReservationDocument } from './models/reservation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger: Logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name) // We're passing a injection token as an argument in @InjectModel
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
