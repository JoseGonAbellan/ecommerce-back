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
    public orderId: number,
    public productId: number,
    public quantity: number,
    public price: number
    ){}
    getValue(): OrderDetailsPropierties{
        return{
            orderDetailId: this.orderDetailId,
            orderId: this.orderId,
            productId: this.productId,
            quantity: this.quantity,
            price: this.price
        }
    }
    static create(props: OrderDetailsPropierties): OrderDetail{
        return new OrderDetail(
            props.orderDetailId,
            props.orderId,
            props.productId,
            props.quantity,
            props.price,
        )
    }
}