import { BadRequestException } from "@nestjs/common";
import { isURL } from "class-validator";

export class UrlValueObject{
    private constructor(private readonly value: string){}
    static create(value: string): UrlValueObject{
        this.validate(value);
        return new UrlValueObject(value);
    }
    getValue(): string{
        return this.value
    }
    private static validate(value: string) : void{
        if (!value || value.trim().length === 0){
            throw new BadRequestException("La imagen del producto es obligatoria")
        }
        if (!isURL(value)){throw new BadRequestException("La URL no es válida")}
    }
}

