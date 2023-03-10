import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);

    if (userDB) {
      const matched = comparePasswords(password, userDB.password);

      if (matched) {
        return userDB;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
