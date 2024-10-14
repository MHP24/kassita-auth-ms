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
    return this.authService.createUser(signUpUserDto);
  }

  @MessagePattern('auth.sign-in')
  signIn(@Payload() signInUserDto: SignInUserDto) {
    return this.authService.loginUser(signInUserDto);
  }

  @MessagePattern('auth.verify.user')
  verifySession(@Payload() token: string) {
    console.log({ token });
    return this.authService.verifySession(token);
  }

  @MessagePattern('auth.refresh-session')
  refreshSession(@Payload() refreshToken: string) {
    return this.authService.refreshSession(refreshToken);
  }
}
