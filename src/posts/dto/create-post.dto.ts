import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public readonly content: string;

  @IsString()
  @IsOptional()
  public readonly media?: string;

  @IsBoolean()
  @IsOptional()
  public readonly public?: boolean;
}
