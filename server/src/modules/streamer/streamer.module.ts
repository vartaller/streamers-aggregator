import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [StreamerController],
  providers: [StreamerService, PrismaService],
})
export class StreamerModule {}
