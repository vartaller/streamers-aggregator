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

  describe('updateVotes', () => {
    it('should update votes with a like', async () => {
      const mockVoteDto: VoteDto = {
        isLlike: true,
      };
      const mockId = 1;

      const mockCurrent = {
        likes: 10,
      };
      const expectedNewVote = mockCurrent.likes + 1;

      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockResolvedValue(mockCreatedStreamer);
      jest
        .spyOn(prismaService.streamer, 'update')
        .mockResolvedValue(mockCreatedStreamer);

      const result = await service.updateVotes(mockVoteDto, mockId);

      expect(result).toEqual(expectedNewVote);
      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: mockId },
        select: { likes: true },
      });
      expect(prismaService.streamer.update).toHaveBeenCalledWith({
        where: { id: mockId },
        data: { likes: mockCurrent.likes + 1 },
      });
    });

    it('should update votes with a dislike', async () => {
      const mockVoteDto: VoteDto = {
        isLlike: false,
      };
      const mockId = 1;

      const mockCurrent = {
        dislikes: 5,
      };
      const expectedNewVote = mockCurrent.dislikes + 1;

      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockResolvedValue(mockCreatedStreamer);
      jest
        .spyOn(prismaService.streamer, 'update')
        .mockResolvedValue(mockCreatedStreamer);

      const result = await service.updateVotes(mockVoteDto, mockId);

      expect(result).toEqual(expectedNewVote);
      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: mockId },
        select: { dislikes: true },
      });
      expect(prismaService.streamer.update).toHaveBeenCalledWith({
        where: { id: mockId },
        data: { dislikes: mockCurrent.dislikes + 1 },
      });
    });

    it('should throw an error if updating votes fails', async () => {
      const mockVoteDto: VoteDto = {
        isLlike: true,
      };
      const mockId = 1;

      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockRejectedValue(new Error());

      await expect(
        service.updateVotes(mockVoteDto, mockId)
      ).rejects.toThrowError(ERRORS.STREAMERS.PUT_RECORD_FAILED);

      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: mockId },
        select: { likes: true },
      });
    });
  });

  describe('putLike', () => {
    it('should update likes for a streamer', async () => {
      const mockId = 1;
      const mockCurrent = {
        likes: 10,
      };
      const expectedNewVote = mockCurrent.likes + 1;

      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockResolvedValue(mockCreatedStreamer);
      jest
        .spyOn(prismaService.streamer, 'update')
        .mockResolvedValue(mockCreatedStreamer);

      const result = await service.putLike(mockId);

      expect(result).toEqual(expectedNewVote);
      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: mockId },
        select: { likes: true },
      });
      expect(prismaService.streamer.update).toHaveBeenCalledWith({
        where: { id: mockId },
        data: { likes: mockCurrent.likes + 1 },
      });
    });
  });

  describe('putDislike', () => {
    it('should update dislikes for a streamer', async () => {
      const mockId = 1;
      const mockCurrent = {
        dislikes: 5,
      };
      const expectedNewVote = mockCurrent.dislikes + 1;

      jest
        .spyOn(prismaService.streamer, 'findUnique')
        .mockResolvedValue(mockCreatedStreamer);
      jest
        .spyOn(prismaService.streamer, 'update')
        .mockResolvedValue(mockCreatedStreamer);

      const result = await service.putDislike(mockId);

      expect(result).toEqual(expectedNewVote);
      expect(prismaService.streamer.findUnique).toHaveBeenCalledWith({
        where: { id: mockId },
        select: { dislikes: true },
      });
      expect(prismaService.streamer.update).toHaveBeenCalledWith({
        where: { id: mockId },
        data: { dislikes: mockCurrent.dislikes + 1 },
      });
    });
  });
});
