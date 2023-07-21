export default interface StreamDto {
  id: number;
  title: string;
  description: string;
  startedAt: Date;
  endedAt: Date;
  averageViewers: number;
  game: string;
  streamer: any;
}
