import { BadRequestException } from "@nestjs/common";
import { isEmpty, isString } from "class-validator";

export class StringValueObject{
    private constructor(private readonly value: string){}
    static create(propierty: string, value: string): StringValueObject{
        this.validate(propierty, value);
        return new StringValueObject(value);
    }
    static createOptional(propierty: string, value?: string): StringValueObject {
    if (value === undefined || value === null) {
     return
    }

    this.validate(propierty, value);
    return new StringValueObject(value);
    }
    getValue(): string{
        return this.value
    }
    private static validate(propierty: string, value: string) : void{
        if (isEmpty(value)){
            throw new BadRequestException(`La propiedad ${propierty} es obligatoria`)
        }
        if (!isString(value)){throw new BadRequestException(`La propiedad ${propierty} tiene que ser una cadena de texto`)}
    }
}