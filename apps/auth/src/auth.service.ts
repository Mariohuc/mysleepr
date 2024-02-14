import { Injectable } from '@nestjs/common';
import { UserDocument } from '@app/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces';


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload =  {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);

    /**
     * This is why we need to access to the response object, thus we'll be able to set the JWT
     * as a cookie on the response object intead of passing as plain text, HTTP cookies are much more secure
     */
    response.cookie('Authentication', token, {
      /**
       * This httpOnly option makes sure that this cookie is only available for http request itself, making 
       * more secure so that people cannot actually deal with this cookie on the client without sending requets
       */
      httpOnly: true,
      expires,
    });
  }

}
