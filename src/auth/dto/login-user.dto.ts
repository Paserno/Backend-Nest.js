import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginUserDto {

    @ApiProperty({
        example: 'test@example.com',
        description: 'Enter email'
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Enter password with some uppercase, lowercase letters and a number'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

}