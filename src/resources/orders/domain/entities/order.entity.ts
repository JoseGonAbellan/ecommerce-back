import { NumberValueObject } from "../../../products/domain/value-objects/number.value-object";
import { OrderDetail } from "./order-detail.entity";


export type OrderPropierties = {
    orderId?: number;
    userId: number;
    orderDate: Date;
    totalAmount: number;
    orderDetails?: OrderDetail[];
};

export class Order{
    constructor(
    public orderId: number,
    public userId: number,
    public orderDate: Date,
    public totalAmount: number,
    public orderDetails: OrderDetail[]
    ){}
    getValue(): OrderPropierties{
        return{
            orderId: this.orderId,
            userId: this.userId,
            orderDate: this.orderDate,
            totalAmount: this.totalAmount,
            orderDetails: this.orderDetails
        }
    }
    static create(props: OrderPropierties): Order{
        return new Order(
            props.orderId,
            props.userId,
            props.orderDate,
            props.totalAmount,
            props.orderDetails
        )
    }
}