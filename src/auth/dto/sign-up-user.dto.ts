import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  apartment?: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
