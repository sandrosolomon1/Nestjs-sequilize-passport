import {Inject, Injectable} from '@nestjs/common';
import {USER_REPOSITORY} from "./users.providers";
import {User} from "./user.entity";
import {UserDto} from "./user.dto";

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly USER: typeof User
    ) {
    }

    async Create(user: UserDto): Promise<User> {
        return await this.USER.create<User>(user)
    }

    async FindByEmail(email: string): Promise<User> {
        return await this.USER.findOne<User>({where: {email}})
    }

    async FindById(id: number): Promise<User> {
        return await this.USER.findOne<User>({ where: { id } })
    }
}
