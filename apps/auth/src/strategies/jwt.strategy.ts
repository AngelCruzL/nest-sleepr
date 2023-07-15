import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request as ExpressRequest } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces';

interface Request extends ExpressRequest {
  Authentication: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          request.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}
