import { EnumValueObject } from "../../../../common/domain/value-objects/enum.value-object";
import { NumberValueObject } from "../../../../common/domain/value-objects/number.value-object";
import { OrderDetail, OrderDetailsPropierties } from "./order-detail.entity";

export enum OrderStatus {
    PENDING = "Pendiente",
    SEND = "Enviado",
    DELIVERED = "Entregado"
}

export enum ShippingOptions {
    HOME = "A domicilio",
    STORE = "Recogida en tienda"
}

export enum PaymentMethod {
    CASH_ON_DELIVERY = "A contrareembolso",
    PAY_ON_STORE = "Pagar en tienda"
}

export type OrderPropierties = {
    orderId?: number;
    userId: number;
    orderDate: Date;
    totalAmount?: number;
    orderDetails?: OrderDetailsPropierties[];
    orderStatus: OrderStatus;
    shippingOptions: ShippingOptions;
    paymentMethod: PaymentMethod
};

export class Order {
    constructor(
        public orderId: NumberValueObject,
        public userId: NumberValueObject,
        public orderDate: Date,
        public totalAmount: NumberValueObject,
        public orderDetails: OrderDetail[],
        public orderStatus: EnumValueObject<OrderStatus>,
        public shippingOptions: EnumValueObject<ShippingOptions>,
        public paymentMethod: EnumValueObject<PaymentMethod>,


    ) { }
    getValue(): OrderPropierties {
        return {
            orderId: this.orderId.getValue(),
            userId: this.userId.getValue(),
            orderDate: this.orderDate,
            totalAmount: this.totalAmount.getValue(),
            orderDetails: this.orderDetails.map((details) => details.getValue()),
            orderStatus: this.orderStatus.getValue(),
            paymentMethod: this.paymentMethod.getValue(),
            shippingOptions: this.shippingOptions.getValue()
        }
    }
    static create(props: OrderPropierties): Order {
        return new Order(
            NumberValueObject.createOptional("order id", props.orderId),
            NumberValueObject.create("user id", props.userId),
            props.orderDate,
            NumberValueObject.createOptional("total amount", props.totalAmount),
            props.orderDetails ? props.orderDetails.map((order) => OrderDetail.create(order)) : [],
            EnumValueObject.create("Estado del pedido", props.orderStatus, OrderStatus),
            EnumValueObject.create("Opciones de entrega", props.shippingOptions, ShippingOptions),
            EnumValueObject.create("Tipo de pago", props.paymentMethod, PaymentMethod)
        )
    }
}