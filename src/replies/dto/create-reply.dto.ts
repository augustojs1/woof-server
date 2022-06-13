import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  public readonly content: string;

  @IsOptional()
  public readonly media?: any;
}
