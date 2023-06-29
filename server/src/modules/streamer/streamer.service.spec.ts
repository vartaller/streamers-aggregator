import { Test, TestingModule } from '@nestjs/testing';
import { StreamerService } from './streamer.service';
import { PrismaService } from '../../services/prisma.service';
import StreamerDto from '../../utils/interface/streamer.dto';
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

    it('should throw an error if getting streamer info fails', async () => {
      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockRejectedValueOnce(new Error());

      await expect(service.getStreamerInfo(1)).rejects.toThrowError(
        ERRORS.STREAMER.GET_RECORD_FAILED
      );

      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
