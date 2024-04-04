import { Inject } from "@nestjs/common";
import { FindByIdProductUseCase } from "../../../products/application/uses-cases/find-byid-product.use-case";
import { OrderRepository, OrderRepositoryToken } from "../../domain/contracts/order.repository";
import { OrderDetail } from "../../domain/entities/order-detail.entity";
import { Order } from "../../domain/entities/order.entity";
import { CreateOrderDetailUseCase } from "../uses-cases/create-order-detail.use-case";
import { CreateOrderUseCase } from "../uses-cases/create-order.use-case";
import { Product } from "../../../products/domain/entities/product.entity";
import { ProductMapper } from "../../../products/infrastructure/persistence/sql/product.mapper";

export type ProductsOrder = {
    id: number;
    quantity: number;
}
export type CreateWorkflowPropierties = {
    userId: number;
    orderDate: Date;
    totalAmount: number;
    productsOrders: ProductsOrder[];
}
export class CreateOrderWorkflow{
    constructor(@Inject(OrderRepositoryToken)
    private readonly orderRepository: OrderRepository,
    private readonly useCaseCreateOrder: CreateOrderUseCase,
    private readonly useCaseCreateOrderDetail: CreateOrderDetailUseCase,
    private readonly useCaseFindByIdProduct: FindByIdProductUseCase,
    ){}
    
    async execute(input: CreateWorkflowPropierties): Promise<Order>{
        const orderEntity = Order.create({userId: input.userId, orderDate: input.orderDate, totalAmount: input.totalAmount})
        const order = await this.useCaseCreateOrder.execute(orderEntity);
        const productPrices: number[] = []
        for (const product of input.productsOrders) {
            const findProduct = await this.useCaseFindByIdProduct.execute(product.id);
            console.log(findProduct);
            console.log(order, "ASDASDASDASD")
            const productPrice = findProduct.price * product.quantity;
            productPrices.push(productPrice);
            const orderDetailEntity = OrderDetail.create({orderId: order.orderId, productId: product.id, quantity: product.quantity, price: productPrice});
            await this.useCaseCreateOrderDetail.execute(orderDetailEntity);
        };
        const totalPrice = productPrices.reduce((acc,curr)=>acc + curr, 0);
        const updateOrderEntity = Order.create({userId: order.userId.getValue(), orderDate: order.orderDate, totalAmount: totalPrice});
        return await this.orderRepository.updateOrder(order.orderId, updateOrderEntity);
    }
}