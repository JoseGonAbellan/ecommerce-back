import { NumberValueObject } from "../../../products/domain/value-objects/number.value-object";


export type OrderPropierties = {
    orderId?: number;
    userId: number;
    orderDate: Date;
    totalAmount: number;
};

export class Order{
    constructor(
    public orderId: number,
    public userId: NumberValueObject,
    public orderDate: Date,
    public totalAmount: number
    ){}
    getValue(): OrderPropierties{
        return{
            orderId: this.orderId,
            userId: this.userId.getValue(),
            orderDate: this.orderDate,
            totalAmount: this.totalAmount
        }
    }
    static create(props: OrderPropierties): Order{
        return new Order(
            props.orderId,
            NumberValueObject.create("La ID del usuario",props.userId),
            props.orderDate,
            props.totalAmount
        )
    }
}