import {User} from "./user.entity";

export class UserDto extends User{
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly gender: string;
}