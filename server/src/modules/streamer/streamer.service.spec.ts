import { Test, TestingModule } from '@nestjs/testing';
import { StreamerService } from './streamer.service';
import { PrismaService } from '../../services/prisma.service';
import StreamerDto from '../../utils/interface/streamer.dto';
import StreamDto from '../../utils/interface/stream.dto';
import { ERRORS } from '../../utils/constants/errors';

describe('StreamerService', () => {
  let service: StreamerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamerService,
        {
          provide: PrismaService,
          useValue: {
            streamer: {
              findUnique: jest.fn(),
            },
            stream: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StreamerService>(StreamerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStreamerInfo', () => {
    it('should return streamer info if found', async () => {
      const mockStreamerInfo: StreamerDto | any = {
        id: 1,
        fullName: 'John Doe',
        img: 'image-url',
        info: 'Some info',
        platform: 'Twitch',
        likes: 10,
        dislikes: 2,
        createdAt: new Date('2022-01-01'),
        updatedAt: new Date('2022-02-15'),
      };

      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockResolvedValue(mockStreamerInfo);

      const result = await service.getStreamerInfo(1);

      expect(result).toEqual(mockStreamerInfo);
      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw error when getting streams for non-existing streamer', async () => {
      const streamerId = 999;
      await expect(
        service.getStreamsByStreamerId(streamerId)
      ).rejects.toThrowError(ERRORS.STREAMER.GET_STREAMS_FAILED);
    });

    it('should add a new stream', async () => {
      const streamDto: StreamDto | any = {
        id: 1,
        title: 'New Stream',
        description: 'New Stream Description',
        startedAt: new Date(),
        endedAt: new Date(),
        averageViewers: 500,
        game: 'New Game',
        streamerId: 1,
      };

      const result = await service.addNewStream(streamDto);
      expect(result).toBe(true);
    });

    it('should throw an error if getting streamer info fails', async () => {
      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockRejectedValueOnce(new Error());

      await expect(service.getStreamerInfo(1)).rejects.toThrowError(
        ERRORS.STREAMER.GET_INFO_FAILED
      );

      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
