import type { FastifyPluginAsync } from "fastify";

import AuthController from "../controllers/auth.controller";
import ProjectController from "../controllers/project.controller";
import ServiceOrderController from "../controllers/service-order.controller";
import { requestAuthentication } from "../hooks/request-authentication";

const publicRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/login", AuthController.login);
};

const protectedRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("onRequest", requestAuthentication);

  fastify.get("/projects", ProjectController.getAllProjects);
  fastify.get("/projects/:id", ProjectController.getProjectById);
  fastify.post("/projects", ProjectController.createProject);
  fastify.put("/projects/:id", ProjectController.updateProject);
  fastify.delete("/projects/:id", ProjectController.deleteProject);
  fastify.get("/projects/count", ProjectController.countProjects);

  fastify.get("/service-orders", ServiceOrderController.getAllServiceOrders);
  fastify.get(
    "/service-orders/:id",
    ServiceOrderController.getServiceOrderById
  );
  fastify.post("/service-orders", ServiceOrderController.createServiceOrder);
  fastify.put("/service-orders/:id", ServiceOrderController.updateServiceOrder);
  fastify.delete(
    "/service-orders/:id",
    ServiceOrderController.deleteServiceOrder
  );
  fastify.get(
    "/service-orders/count",
    ServiceOrderController.countServiceOrders
  );
};

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(publicRoutes, { prefix: "/auth" });
  fastify.register(protectedRoutes);
};
