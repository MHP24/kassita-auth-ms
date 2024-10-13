import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { SignInUserDto, SignUpUserDto } from './dto';
import { Hasher, IdGenerator } from '../common';
import { envs } from '../config';
import { JwtPayload } from './interfaces';
import { Session, SessionToken, User } from './types';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(AuthService.name);
  private hasher = new Hasher();
  private idGenerator = new IdGenerator();

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connection ready');
  }

  // * Register user and return JWT (auto sign in on register)
  async createUser(signUpUserDto: SignUpUserDto): Promise<{ user: User }> {
    try {
      const { password, ...rest } = signUpUserDto;
      // * User creation
      const user = await this.user.create({
        data: {
          password: await this.hasher.hash(password),
          ...rest,
        },
      });

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
        },
      };
    } catch (error) {
      this.handleDatabaseErrors(error);
    }
  }

  /*
   * Makes validation using validateUser and
   * if the user is valid generates JWT
   */
  async loginUser(data: SignInUserDto): Promise<Session> {
    const { email, password } = data;
    const user = await this.validateUserCredentials(email, password);
    const token = await this.handleAccessCredentials({
      userId: user.id,
      sessionId: this.idGenerator.generateId(),
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
      token,
    };
  }

  // * Valiadate user credentials vs db
  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.user.findUnique({
      where: { email, isActive: true },
    });
    const isValidPassword = await this.hasher.compareHash(
      password,
      user?.password ?? '',
    );

    if (!user || !isValidPassword) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid email or password',
      });
    }

    return user;
  }

  // * Sign token
  signToken(data: JwtPayload): SessionToken {
    return {
      accessToken: this.jwtService.sign(data),
      refreshToken: this.jwtService.sign(data, {
        expiresIn: envs.jwtRefreshExpireText,
        secret: envs.jwtRefreshSecret,
      }),
      expiresIn: new Date().setTime(
        new Date().getTime() + envs.jwtExpireSeconds * 1000,
      ),
    };
  }

  // * This method stores current token on db
  async applySession(userId: string, sessionId: string): Promise<void> {
    await this.user.update({
      where: { id: userId },
      data: {
        sessionId: await this.hasher.hash(sessionId),
        lastAccess: new Date(),
      },
    });
  }

  // * Handler for creation and saving
  async handleAccessCredentials(data: JwtPayload): Promise<SessionToken> {
    const token = this.signToken(data);
    await this.applySession(data.userId, data.sessionId);
    return token;
  }

  // * Error Handler for service
  handleDatabaseErrors(error: any): void {
    const badRequestCodes = {
      P2002: 'This email already exists',
    };

    const requestError = badRequestCodes[error.code];
    if (requestError)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: requestError,
      });

    this.logger.error(error);
    throw new RpcException({
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad request',
    });
  }
}
