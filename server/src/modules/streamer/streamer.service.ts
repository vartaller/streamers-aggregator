import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import StreamerDto from '../../utils/interface/streamer.dto';
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
      throw new Error(ERRORS.STREAMER.GET_RECORD_FAILED);
    }
  }
}
