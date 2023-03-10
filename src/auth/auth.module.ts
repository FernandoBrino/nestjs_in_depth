import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './passportStrategies/jwt.strategy';
import { LocalStrategy } from './passportStrategies/local.strategy';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
