import { BadRequestException } from "@nestjs/common";
import { isInt } from "class-validator";

export class NumberValueObject{
    private constructor(private readonly value: number){}
    static create(propierty: string, value: number): NumberValueObject{
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
        if (!isInt(value) && value < 0){throw new BadRequestException(`La propiedad ${propierty} no puede ser menor que 0`)}
    }
}