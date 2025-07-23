import { ExtractJwt, Strategy } from 'passport-jwt';

/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JWT_CONFIG } from './jwt.config';
import { IJwtPayload } from './jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async () => JWT_CONFIG.secret,
    });
  }

  validate(payload: IJwtPayload) {
    return { sub: payload.sub, email: payload.email };
  }
}
