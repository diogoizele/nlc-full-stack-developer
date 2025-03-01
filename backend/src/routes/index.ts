import type { FastifyPluginAsync } from "fastify";

import AuthController from "../controllers/auth.controller";
import ProjectController from "../controllers/project.controller";
import serviceOrderController from "../controllers/service-order.controller";
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

  fastify.get("/service-orders", serviceOrderController.getAllServiceOrders);
  fastify.get(
    "/service-orders/:id",
    serviceOrderController.getServiceOrderById
  );
  fastify.post("/service-orders", serviceOrderController.createServiceOrder);
  fastify.put("/service-orders/:id", serviceOrderController.updateServiceOrder);
  fastify.delete(
    "/service-orders/:id",
    serviceOrderController.deleteServiceOrder
  );
};

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(publicRoutes, { prefix: "/auth" });
  fastify.register(protectedRoutes);
};
