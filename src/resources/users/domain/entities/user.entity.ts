import { EnumValueObject } from "../../../../common/domain/value-objects/enum.value-object";
import { NumberValueObject } from "../../../../common/domain/value-objects/number.value-object";
import { StringValueObject } from "../../../../common/domain/value-objects/string.value-object";


export enum RolEnum{
    USER= "User",
    ADMIN= "Admin"
}

export type UserPropierties = {
    userID: number;
    userName: string;
    userLastName: string;
    userEmail: string;
    userPassword?: string;
    userAddress: string;
    userPhone: number;
    rol: RolEnum;
};

export class User{
    constructor(
    public userID: number,
    public userName: StringValueObject,
    public userLastName: StringValueObject,
    public userEmail: StringValueObject,
    public userPassword: StringValueObject,
    public userAddress: StringValueObject,
    public userPhone: NumberValueObject,
    public rol: EnumValueObject<RolEnum>
    ){}
    getValue(): UserPropierties{
        return{
            userID: this.userID,
            userName: this.userName.getValue(),
            userLastName: this.userLastName.getValue(),
            userEmail: this.userEmail.getValue(),
            userPassword: this.userPassword.getValue(),
            userAddress: this.userAddress.getValue(),
            userPhone: this.userPhone.getValue(),
            rol: this.rol.getValue()
        }
    }
    static create(props: UserPropierties): User{
        return new User(
            props.userID,
            StringValueObject.create("Nombre",props.userName),
            StringValueObject.create("Apellido", props.userLastName),
            StringValueObject.create("Email", props.userEmail),
            StringValueObject.createOptional("Contraseña", props.userPassword),
            StringValueObject.create("Dirección", props.userAddress),
            NumberValueObject.create("Teléfono",props.userPhone),
            EnumValueObject.create("Rol del usuario", props.rol, RolEnum)
        )
    }
}