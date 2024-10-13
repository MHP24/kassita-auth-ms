import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
// * Types
import { SignInUserDto, SignUpUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.sign-up')
  signUp(@Payload() signUpUserDto: SignUpUserDto) {
    console.log({ msPayload: signUpUserDto });
    return this.authService.createUser(signUpUserDto);
  }

  @MessagePattern('auth.sign-in')
  signIn(@Payload() signInUserDto: SignInUserDto) {
    return this.authService.loginUser(signInUserDto);
  }
}
