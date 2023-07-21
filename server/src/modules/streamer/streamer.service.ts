import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import StreamerDto from '../../utils/interface/streamer.dto';
import StreamDto from '../../utils/interface/stream.dto';
import { ERRORS } from '../../utils/constants/errors';

@Injectable()
export class StreamerService {
  constructor(private readonly prisma: PrismaService) {}

  async getStreamerInfo(id: number): Promise<StreamerDto> {
    try {
      const streamerInfo = await this.prisma.streamer.findUnique({
        where: { id: id },
      });

      if (!streamerInfo) {
        throw new Error(ERRORS.GENERAL.NOT_EXIST);
      }

      return streamerInfo;
    } catch {
      throw new Error(ERRORS.STREAMER.GET_INFO_FAILED);
    }
  }

  async getStreamsByStreamerId(id: number): Promise<any> {
    try {
      const streams = await this.prisma.stream.findMany({
        where: { streamerId: id },
      });

      if (!streams) {
        throw new Error(ERRORS.STREAMS.GET_RECORD_FAILED);
      }

      return streams;
    } catch {
      throw new Error(ERRORS.STREAMER.GET_STREAMS_FAILED);
    }
  }

  async addNewStream(streamDto: StreamDto): Promise<boolean> {
    const { streamerId, id, ...rest } = streamDto;
    const formattedStreamDto = {
      ...rest,
      startedAt: new Date(streamDto.startedAt),
      endedAt: new Date(streamDto.endedAt),
      averageViewers: Number(streamDto.averageViewers),
    };
    try {
      await this.prisma.stream.create({
        data: {
          ...formattedStreamDto,
          streamer: {
            connect: { id: Number(streamerId) },
          },
        },
      });
      return true;
    } catch {
      throw new Error(ERRORS.STREAMS.CREATE_RECORD_FAILED);
    }
  }
}
