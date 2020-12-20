import * as Validator from 'class-validator';

export class LoginUserDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 64)
    username: string;
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 128)
    password: string;
}