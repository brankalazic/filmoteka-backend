import * as Validator from 'class-validator';

export class MovieSearchDto {
<<<<<<< HEAD
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 128)
    keywords: string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
    genreId: number;

    priceMin: number;    
=======
    @Validator.IsOptional()
    @Validator.IsString()
    @Validator.Length(2, 128)
    keywords: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2, 64)
    genre: string;
>>>>>>> fdebe10012045b5996515786a7301c1fa601dd06

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
<<<<<<< HEAD
    priceMax: number;
=======
    priceMin: number;
>>>>>>> fdebe10012045b5996515786a7301c1fa601dd06

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2,
    })
<<<<<<< HEAD
=======
    priceMax: number;
>>>>>>> fdebe10012045b5996515786a7301c1fa601dd06

    @Validator.IsOptional()
    @Validator.IsIn(['name', 'price'])
    orderBy: 'name' | 'price';

    @Validator.IsOptional()
    @Validator.IsIn(['ASC', 'DESC'])
    orderDirection: 'ASC' | 'DESC';

    @Validator.IsOptional()
    @Validator.IsPositive()
    @Validator.IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    })
    page: number;

    @Validator.IsOptional()
    @Validator.IsIn([5, 10, 25, 50, 75])
    itemsPerPage: 5 | 10 | 25 | 50 | 75;
}