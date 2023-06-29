import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamerModule } from './modules/streamer/streamer.module';
import { StreamersModule } from './modules/streamers/streamers.module';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [StreamerModule, StreamersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
