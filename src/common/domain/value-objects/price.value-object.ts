

import { BadRequestException } from "@nestjs/common";
import { isInt, isNumber } from "class-validator";

export class PriceValueObject{
    private constructor(private readonly value: number){}
    static create(propierty: string, value: number): PriceValueObject{
        this.validate(propierty, value);
        return new PriceValueObject(value);
    }
    static createOptional(propierty: string, value?: number): PriceValueObject {
     if (value === undefined || value === null) {
         return
        }
        this.validate(propierty, value);
        return new PriceValueObject(value);
    }
    getValue(): number{
        return this.value
    }
    private static validate(propierty: string, value: number) : void{
        if (!value){
            throw new BadRequestException(`La propiedad ${propierty} es obligatoria`)
        }
         if (!isNumber){
            throw new BadRequestException(`La propiedad ${propierty} tiene que es un número`)
        }
        if (!isInt(value) && value < 0){throw new BadRequestException(`La propiedad ${propierty} no puede ser menor que 0`)}
    }
}