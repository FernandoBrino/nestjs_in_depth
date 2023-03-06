import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: UsersService) {}

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
}
