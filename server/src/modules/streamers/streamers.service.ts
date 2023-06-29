import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import StreamerDto from '../../utils/interface/streamer.dto';
import VoteDto from '../../utils/interface/vote.dto';
import { ERRORS } from '../../utils/constants/errors';

@Injectable()
export class StreamersService {
  constructor(private readonly prisma: PrismaService) {}

  async addStreamer(streamerDto: StreamerDto): Promise<boolean> {
    try {
      await this.prisma.streamer.create({
        data: { ...streamerDto },
      });
      return true;
    } catch {
      throw new Error(ERRORS.STREAMERS.CREATE_RECORD_FAILED);
    }
  }

  async getStreamers(): Promise<StreamerDto[]> {
    try {
      const streamersList = await this.prisma.streamer.findMany({
        orderBy: {
          likes: 'desc',
        },
      });

      return streamersList;
    } catch {
      throw new Error(ERRORS.STREAMERS.GET_RECORDS_FAILED);
    }
  }

  async updateVotes(voteDto: VoteDto, id: number): Promise<number> {
    try {
      let newVote: number;
      if (voteDto.isLlike) {
        newVote = await this.putLike(id);
      } else {
        newVote = await this.putDislike(id);
      }
      return newVote;
    } catch {
      throw new Error(ERRORS.STREAMERS.PUT_RECORD_FAILED);
    }
  }

  async putLike(id: number) {
    const current = await this.prisma.streamer.findUnique({
      where: { id: id },
      select: { likes: true },
    });
    await this.prisma.streamer.update({
      where: { id: id },
      data: { likes: current.likes + 1 },
    });
    return current.likes + 1;
  }

  async putDislike(id: number) {
    const current = await this.prisma.streamer.findUnique({
      where: { id: id },
      select: { dislikes: true },
    });
    await this.prisma.streamer.update({
      where: { id: id },
      data: { dislikes: current.dislikes + 1 },
    });
    return current.dislikes + 1;
  }
}
