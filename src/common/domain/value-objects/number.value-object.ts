import { BadRequestException } from "@nestjs/common";
import { isNumber } from "class-validator";

export class NumberValueObject{
    private constructor(private readonly value: number){}
    static create(propierty: string, value: number): NumberValueObject{
        this.validate(propierty, value);
        return new NumberValueObject(value);
    }
    static createOptional(propierty: string, value?: number): NumberValueObject {
        if (value === undefined || value === null) {
         return
        }

        this.validate(propierty, value);
        return new NumberValueObject(value);
    }
    getValue(): number{
        return this.value
    }
    private static validate(propierty: string, value: number) : void{
        if (!value){
            throw new BadRequestException(`La propiedad ${propierty} es obligatoria`)
        }
        // if (!isNumber(value)){throw new BadRequestException(`La propiedad ${propierty} debe ser un número`)}
    }
}