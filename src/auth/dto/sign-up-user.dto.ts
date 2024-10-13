import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  apartment: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
