import { Param, Controller, Get, Post, Body } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import StreamerDto from '../../utils/interface/streamer.dto';
import StreamDto from '../../utils/interface/stream.dto';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}
  @Get(':id')
  getStreamerInfo(@Param('id') id: string): Promise<StreamerDto> {
    return this.streamerService.getStreamerInfo(Number(id));
  }

  @Get(':id/streams')
  async getStreamsByStreamerId(@Param('id') id: string): Promise<StreamDto> {
    const result = await this.streamerService.getStreamsByStreamerId(
      Number(id)
    );
    return result;
  }

  @Post(':id/stream')
  async addNewStream(
    @Param('id') id: string,
    @Body() data: StreamDto
  ): Promise<boolean> {
    const result = await this.streamerService.addNewStream(data);
    return result;
  }
}
