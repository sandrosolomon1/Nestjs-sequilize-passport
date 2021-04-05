import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";
import {UserDto} from "../users/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly UserService: UsersService,
        private JwtService: JwtService
    ) {
    }

    async validateUser(email: string, pw: string) {
        const user = await this.UserService.FindByEmail(email)

        if(!user) return null

        return user

        const match = this.ValidatePassword(pw, user.password)

        if(!match) return null

        const { password, ...result } = user['dataValues'];
        return result;
    }

    private async ValidatePassword(epw, dbpw){
        return await bcrypt.compare(epw,dbpw)
    }

    async login(user) {
        const User = this.UserService.FindByEmail(user.email)

        if(!User) throw new UnauthorizedException('invalid Credentials')

        const token = this.JwtService.signAsync(user)
        return {
            User,
            token
        }
    }

    async register(user: UserDto) {
        const pw = await bcrypt.hash(user.password,10)
        const newuser = await this.UserService.Create(user)
        const {password,...res} = newuser['dataValues']

        const token = this.JwtService.signAsync(res)

        return {
            newuser,
            token
        }
    }
}
