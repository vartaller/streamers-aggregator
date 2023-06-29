import { Body, Controller, Param, Post, Get, Put } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import StreamerDto from '../../utils/interface/streamer.dto';
import VoteDto from '../../utils/interface/vote.dto';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post()
  addStreamer(@Body() streamerDto: StreamerDto): Promise<boolean> {
    return this.streamersService.addStreamer(streamerDto);
  }

  @Get()
  getStreamers(): Promise<StreamerDto[]> {
    return this.streamersService.getStreamers();
  }

  @Put(':id/vote')
  updateVotes(
    @Param('id') id: string,
    @Body() voteDto: VoteDto
  ): Promise<number> {
    return this.streamersService.updateVotes(voteDto, Number(id));
  }
}
