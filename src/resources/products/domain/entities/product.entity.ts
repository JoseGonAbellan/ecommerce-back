import { EnumValueObject } from "../../../../common/domain/value-objects/enum.value-object";
import { NumberValueObject } from "../value-objects/number.value-object";
import { StringValueObject } from "../value-objects/string.value-object";
import { UrlValueObject } from "../value-objects/url.value-object";

export enum ProductType{
    BOARD_GAMES= "Juegos de mesa",
    ROLE_GAMES= "Juegos de rol",
    CARD_GAMES= "Juegos de cartas",
    MERCHANDISING= "Merchandising"
}
export type ProductPropierties = {
    productID: number;
    productName: string;
    productDescription: string;
    price: number;
    stock: number;
    productImageURL: string;
    productType: ProductType;
};

export class Product{
    constructor(
    public productID: number,
    public productName: StringValueObject,
    public productDescription: StringValueObject,
    public price: number,
    public stock: NumberValueObject,
    public productImageURL: UrlValueObject,
    public productType: EnumValueObject<ProductType>
    ){}
    getValue(): ProductPropierties{
        return{
            productID: this.productID,
            productName: this.productName.getValue(),
            productDescription: this.productDescription.getValue(),
            price: this.price,
            stock: this.stock.getValue(),
            productImageURL: this.productImageURL.getValue(),
            productType: this.productType.getValue()
        }
    }
    static create(props: ProductPropierties): Product{
        return new Product(
            props.productID,
            StringValueObject.create("Nombre del producto",props.productName),
            StringValueObject.create("Descripción", props.productDescription),
            props.price,
            NumberValueObject.create("stock", props.stock),
            UrlValueObject.create(props.productImageURL),
            EnumValueObject.create("Tipo de producto", props.productType, ProductType)
        )
    }
}