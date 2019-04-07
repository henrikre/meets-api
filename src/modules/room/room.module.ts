import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomRepository])
  ],
  controllers: [RoomController],
  providers: [RoomService]
})

export class RoomModule {}
