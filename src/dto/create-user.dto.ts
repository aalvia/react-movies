import { IsString, IsEmail,IsOptional } from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsOptional()
    username?: string;
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsString()
    @IsOptional()
    password?: string;
}