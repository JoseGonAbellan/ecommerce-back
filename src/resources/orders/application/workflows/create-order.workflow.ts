import { Inject } from "@nestjs/common";
import { FindByIdProductUseCase } from "../../../products/application/uses-cases/find-byid-product.use-case";
import { UpdateProductUseCase } from "../../../products/application/uses-cases/update-product.use-case";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { OrderDetail } from "../../domain/entities/order-detail.entity";
import { Order, OrderPropierties, OrderStatus, PaymentMethod, ShippingOptions } from "../../domain/entities/order.entity";
import { CreateOrderDetailUseCase } from "../uses-cases/create-order-detail.use-case";
import { CreateOrderUseCase } from "../uses-cases/create-order.use-case";
import { UpdateOrderUseCase } from "../uses-cases/update-order.use-case";

export type ProductsOrder = {
    id: number;
    quantity: number;
}
export type CreateWorkflowPropierties = {
    userId: number;
    orderDate: Date;
    totalAmount: number;
    productsOrders: ProductsOrder[];
    shippingOptions: ShippingOptions;
    paymentMethod: PaymentMethod;
}
export class CreateOrderWorkflow {
    constructor(@Inject(OrderRepositoryToken)
    private readonly orderRepository: OrderRepository,
        private readonly useCaseCreateOrder: CreateOrderUseCase,
        private readonly useCaseCreateOrderDetail: CreateOrderDetailUseCase,
        private readonly useCaseFindByIdProduct: FindByIdProductUseCase,

        private readonly useCaseUpdateProduct: UpdateProductUseCase,
        private readonly updateOrderUseCase: UpdateOrderUseCase,
    ) { }

    async execute(input: CreateWorkflowPropierties): Promise<OrderPropierties> {
        const orderEntity = Order.create({ userId: input.userId, orderDate: input.orderDate, totalAmount: input.totalAmount, shippingOptions: input.shippingOptions, paymentMethod: input.paymentMethod, orderStatus: OrderStatus.PENDING })
        const order = await this.useCaseCreateOrder.execute(orderEntity);

        const productPrices: number[] = []
        for (const product of input.productsOrders) {
            const findProduct = await this.useCaseFindByIdProduct.execute(product.id);
            const productPrice = findProduct.price * product.quantity;
            productPrices.push(productPrice);
            const orderDetailEntity = OrderDetail.create({ orderId: order.orderId, productId: product.id, quantity: product.quantity, price: productPrice });
            await this.useCaseCreateOrderDetail.execute(orderDetailEntity);
            await this.useCaseUpdateProduct.execute(product.id, { ...findProduct, stock: findProduct.stock - product.quantity })
        };

        const totalPrice = productPrices.reduce((acc, curr) => acc + curr, 0);
        const result = await this.updateOrderUseCase.execute(order.orderId, { userId: order.userId, orderDate: order.orderDate, totalAmount: totalPrice, shippingOptions: input.shippingOptions, paymentMethod: input.paymentMethod, orderStatus: OrderStatus.PENDING });
        return result;
    }
}