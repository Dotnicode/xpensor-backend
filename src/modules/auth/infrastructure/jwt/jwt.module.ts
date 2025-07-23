import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_CONFIG } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: { expiresIn: JWT_CONFIG.expiresIn },
    }),
    PassportModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthJwtModule {}
