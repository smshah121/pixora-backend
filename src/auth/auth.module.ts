import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local-strategy';
import { JwtStrategy } from './strategy/jwt-strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [UserModule, PassportModule,
    JwtModule.register({
      secret: "smshah",
      signOptions: {expiresIn: "1h"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
