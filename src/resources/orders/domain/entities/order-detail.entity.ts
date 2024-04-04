import { NumberValueObject } from "../../../products/domain/value-objects/number.value-object";


export type OrderDetailsPropierties = {
    orderDetailId?: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
};

export class OrderDetail{
    constructor(
    public orderDetailId: number,
    public orderId: NumberValueObject,
    public productId: NumberValueObject,
    public quantity: NumberValueObject,
    public price: NumberValueObject
    ){}
    getValue(): OrderDetailsPropierties{
        return{
            orderDetailId: this.orderDetailId,
            orderId: this.orderId.getValue(),
            productId: this.productId.getValue(),
            quantity: this.quantity.getValue(),
            price: this.price.getValue()
        }
    }
    static create(props: OrderDetailsPropierties): OrderDetail{
        return new OrderDetail(
            props.orderDetailId,
            NumberValueObject.create("La ID del pedido",props.orderId),
            NumberValueObject.create("La ID del producto",props.productId),
            NumberValueObject.create("La cantidad del producto",props.quantity),
            NumberValueObject.create("El precio del producto",props.price),
        )
    }
}