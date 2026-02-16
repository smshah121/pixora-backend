import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    email: string

    @IsOptional()
    @IsString()
    password?: string
}
