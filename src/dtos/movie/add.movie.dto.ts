import * as Validator from "class-validator";

export class AddMovieDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 64)
    name: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(32, 10000)
    description: string;

    @Validator.IsString()
    @Validator.Length(3, 64)
    genre: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(4, 5)
    year: string;

    @Validator.IsNotEmpty()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    rating: number;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    price: number;
}




