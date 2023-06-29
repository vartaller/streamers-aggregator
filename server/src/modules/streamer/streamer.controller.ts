import { Param, Controller, Get } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import StreamerDto from '../../utils/interface/streamer.dto';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}
  @Get(':id')
  getStreamerInfo(@Param('id') id: string): Promise<StreamerDto> {
    return this.streamerService.getStreamerInfo(Number(id));
  }
}
