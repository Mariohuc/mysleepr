import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser, UserDocument } from '@app/common';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    /**
     * this custom decorator allow us to get the curent user after they've run
     * through the local auth guard, this a common patter where you want to get
     * access to the current user in the route after you authenticated them
     */
    @CurrentUser() user: UserDocument,
    /**
     * This second parameter is going to allow us to get access to the
     * response object itself, the reason is to set a cookie
     */
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  /**
   * @MessagePattern is going to allow us to accept incoming RPC calls on our
   * chosen transport layer (in this case TCP)
   */
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(
    /**Notice that using @CurrentUser() user and return only user is acceptable too */
    @Payload() data: any,
  ) {
    return data.user as UserDocument;
  }
}
