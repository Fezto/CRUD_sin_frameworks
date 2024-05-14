import Fastify from "fastify";
import cors from "@fastify/cors"

import * as database from "./database.js";

const fastify = Fastify()
await fastify.register(cors, {
  logger: true
})

fastify.get("/:table", async (request, reply) => {
  return await database.get({ table: request.params.table });
});

fastify.get("/tables", async (request, reply) => {
    return await database.getTables()
});

fastify.get("/:table/:property", async (request, reply) => {
    return await database.getColumns({ table: request.params.table, property: request.params.property })
})

fastify.post("/:table", async(request, reply) => {
    console.log(request.params.table, request.body)
    return await database.post({ table: request.params.table, data: request.body })
})

fastify.put("/:table/:id", async (request, reply) => {
  return await database.edit({ table: request.params.table, id: request.params.id, data: request.body.data })
})

fastify.delete("/:table/:id", async (request, reply) => {
  return await database.remove({ table: request.params.table, id: request.body.data })
})

try {
  await fastify.listen({ port: 3000 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
