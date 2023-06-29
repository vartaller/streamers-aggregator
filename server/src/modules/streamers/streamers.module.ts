import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [StreamersController],
  providers: [StreamersService, PrismaService],
})
export class StreamersModule {}
