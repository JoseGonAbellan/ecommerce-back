import { NumberValueObject } from "../../../../common/domain/value-objects/number.value-object";
import { OrderDetail, OrderDetailsPropierties } from "./order-detail.entity";


export type OrderPropierties = {
    orderId?: number;
    userId: number;
    orderDate: Date;
    totalAmount?: number;
    orderDetails?: OrderDetailsPropierties[];
};

export class Order{
    constructor(
    public orderId: NumberValueObject,
    public userId: NumberValueObject,
    public orderDate: Date,
    public totalAmount: NumberValueObject,
    public orderDetails: OrderDetail[]
    ){}
    getValue(): OrderPropierties{
        return{
            orderId: this.orderId.getValue(),
            userId: this.userId.getValue(),
            orderDate: this.orderDate,
            totalAmount: this.totalAmount.getValue(),
            orderDetails: this.orderDetails.map((details) => details.getValue())
        }
    }
    static create(props: OrderPropierties): Order{
        return new Order(
            NumberValueObject.createOptional("order id", props.orderId),
            NumberValueObject.create("user id", props.userId),
            props.orderDate,
            NumberValueObject.createOptional("total amount", props.totalAmount),
            props.orderDetails? props.orderDetails.map((order) => OrderDetail.create(order)) : []
        )
    }
}