import express from "express";
import swaggerUiExpress from "swagger-ui-express";
import { readFile } from "node:fs/promises";

const swaggerDocument = JSON.parse(
  await readFile(new URL("../docs/api-docs.json", import.meta.url))
);

export function swaggerRoutes() {
  const router = express.Router();
  router.use("/api-docs", swaggerUiExpress.serve);
  router.get("/api-docs", swaggerUiExpress.setup(swaggerDocument));
  return router;
}
