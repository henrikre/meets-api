import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { RoomRepository } from '../room/room.repository';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationRepository
    ]),

    RoomModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})

export class ReservationModule {}
