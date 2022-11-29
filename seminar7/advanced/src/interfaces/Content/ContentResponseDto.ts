import { EpisodeInfo } from "./EpisodeInfo";

export interface ContentResponseDto {
  id: number;
  contentName: string;
  genre: string;
  ageLimit: number;
  episode: EpisodeInfo[];
}
