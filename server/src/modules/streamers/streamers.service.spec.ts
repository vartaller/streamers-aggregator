import { Test, TestingModule } from '@nestjs/testing';
import { StreamersService } from './streamers.service';
import { PrismaService } from '../../services/prisma.service';
import StreamerDto from '../../utils/interface/streamer.dto';
import VoteDto from '../../utils/interface/vote.dto';
import { ERRORS } from '../../utils/constants/errors';

const mockCreatedStreamer = {
  id: 1,
  fullName: 'John Doe',
  img: 'image-url',
  info: 'Some info',
  platform: 'Twitch',
  likes: 10,
  dislikes: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('StreamersService', () => {
  let service: StreamersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamersService,
        {
          provide: PrismaService,
          useValue: {
            streamer: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StreamersService>(StreamersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addStreamer', () => {
    it('should add a new streamer', async () => {
      const mockStreamerDto: StreamerDto = {
        fullName: 'John Doe',
        img: 'image-url',
        info: 'Some info',
        platform: 'Twitch',
      };

      jest
        .spyOn(prismaService.streamer, 'create')
        .mockResolvedValue(mockCreatedStreamer);

      const result = await service.addStreamer(mockStreamerDto);

      expect(result).toBeTruthy();
      expect(prismaService.streamer.create).toHaveBeenCalledWith({
        data: mockStreamerDto,
      });
    });

    it('should throw an error if creating a streamer fails', async () => {
      const mockStreamerDto: StreamerDto = {
        fullName: 'John Doe',
        img: 'image-url',
        info: 'Some info',
        platform: 'Twitch',
      };

      jest
        .spyOn(prismaService.streamer, 'create')
        .mockRejectedValue(new Error());

      await expect(service.addStreamer(mockStreamerDto)).rejects.toThrowError(
        ERRORS.STREAMERS.CREATE_RECORD_FAILED
      );

      expect(prismaService.streamer.create).toHaveBeenCalledWith({
        data: mockStreamerDto,
      });
    });
  });

  describe('getStreamers', () => {
    it('should return a list of streamers', async () => {
      const mockStreamersList = [
        {
          id: 1,
          fullName: 'John Doe',
          img: 'image-url',
          info: 'Some info',
          platform: 'Twitch',
          likes: 10,
          dislikes: 2,
          createdAt: new Date('2022-01-01'),
          updatedAt: new Date('2022-02-15'),
        },
      ];

      jest
        .spyOn(prismaService.streamer, 'findMany')
        .mockResolvedValue(mockStreamersList);

      const result = await service.getStreamers();

      expect(result).toEqual(mockStreamersList);
      expect(prismaService.streamer.findMany).toHaveBeenCalledWith({
        orderBy: {
          likes: 'desc',
        },
      });
    });

    it('should throw an error if getting streamers fails', async () => {
      jest
        .spyOn(prismaService.streamer, 'findMany')
        .mockRejectedValue(new Error());

      await expect(service.getStreamers()).rejects.toThrowError(
        ERRORS.STREAMERS.GET_RECORDS_FAILED
      );

      expect(prismaService.streamer.findMany).toHaveBeenCalledWith({
        orderBy: {
          likes: 'desc',
        },
      });
    });
  });
});
