import type { FastifyReply, FastifyRequest } from "fastify";

import ServiceOrderService from "../services/service-order.service";
import type { CreateServiceOrderRequest } from "./requests/create-service-order-request.types";
import type { GetAllServiceOrdersRequest } from "./requests/get-all-service-orders-request.types";

class ServiceOrderController {
  async getAllServiceOrders(
    request: FastifyRequest<{ Querystring: GetAllServiceOrdersRequest }>,
    reply: FastifyReply
  ) {
    const { query } = request.query;

    const response = await ServiceOrderService.getAllServiceOrders({ query });

    return reply.code(200).send(response);
  }

  async getServiceOrderById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const response = await ServiceOrderService.getServiceOrderById(Number(id));

    return reply.code(200).send(response);
  }

  async createServiceOrder(
    request: FastifyRequest<{ Body: CreateServiceOrderRequest }>,
    reply: FastifyReply
  ) {
    const response = await ServiceOrderService.createServiceOrder(request.body);

    return reply.code(201).send(response);
  }

  async updateServiceOrder(
    request: FastifyRequest<{
      Params: { id: string };
      Body: CreateServiceOrderRequest;
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;

    const response = await ServiceOrderService.updateServiceOrder(
      Number(id),
      request.body
    );

    return reply.code(200).send(response);
  }

  async updateServiceOrderStatus(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { status: boolean };
    }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    const { status } = request.body;

    const response = await ServiceOrderService.updateServiceOrderStatus(
      Number(id),
      status
    );

    return reply.code(200).send(response);
  }

  async deleteServiceOrder(
    request: FastifyRequest<{ Params: { id: string } }>,

    reply: FastifyReply
  ) {
    const { id } = request.params;

    await ServiceOrderService.delete(Number(id));

    return reply.code(204).send();
  }

  async countServiceOrders(request: FastifyRequest, reply: FastifyReply) {
    const response = await ServiceOrderService.getServiceOrdersCount();

    return reply.code(200).send(response);
  }
}

export default new ServiceOrderController();
