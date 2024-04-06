import { NumberValueObject } from "../../../../common/domain/value-objects/number.value-object";


export type OrderDetailsPropierties = {
    orderDetailId?: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
};

export class OrderDetail{
    constructor(
    public orderDetailId: NumberValueObject,
    public orderId: NumberValueObject,
    public productId: NumberValueObject,
    public quantity: NumberValueObject,
    public price: NumberValueObject
    ){}
    getValue(): OrderDetailsPropierties{
        return{
            orderDetailId: this.orderDetailId.getValue(),
            orderId: this.orderId.getValue(),
            productId: this.productId.getValue(),
            quantity: this.quantity.getValue(),
            price: this.price.getValue()
        }
    }
    static create(props: OrderDetailsPropierties): OrderDetail{
        return new OrderDetail(
            NumberValueObject.createOptional("order detail id",props.orderDetailId),
            NumberValueObject.create("order id", props.orderId),
            NumberValueObject.create("product id", props.productId),
            NumberValueObject.create("quantity", props.quantity),
            NumberValueObject.create("price",  props.price),
        )
    }
}