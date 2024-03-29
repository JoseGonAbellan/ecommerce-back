import { BadRequestException } from '@nestjs/common';

export class EnumValueObject<T> {
    private constructor(private readonly value: T) {}

    static create<T>(propertyName: string, value: T, enumObj: Record<string, T>): EnumValueObject<T> {
        this.validate(propertyName, value, enumObj);
        return new EnumValueObject(value);
    }

    getValue(): T {
        return this.value;
    }

    private static validate<T>(propertyName: string, value: T, enumObj: Record<string, T>): void {
        if (value === undefined || value === null) {
            throw new BadRequestException(`La propiedad ${propertyName} es obligatoria`);
        }
        if (value !== null && !Object.values(enumObj).includes(value)) {
            throw new BadRequestException(`El valor de ${propertyName} no es válido`);
        }
    }
}