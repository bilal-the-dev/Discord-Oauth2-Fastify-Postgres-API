import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { httpMethods } from "../typings/types.js";
import { protect } from "../handlers/authHandler.js";

export const sendResponse = (
  req: FastifyRequest<{ Querystring: { fields?: string } }>,
  reply: FastifyReply,
  fieldName: string,
  data: unknown
) => {
  const {
    discordUser,
    query: { fields },
  } = req;

  const fieldArray = fields?.split(",");

  if (fieldArray?.includes("user")) data = { discordUser, [fieldName]: data };

  reply.send({
    status: "success",
    data,
  });
};

export default async function customFastify({
  fastify,
  type,
  path,
  fieldName,
  handler,
}: {
  fastify: FastifyInstance;
  type: httpMethods;
  path: string;
  fieldName: string;
  handler: (req: FastifyRequest, reply: FastifyReply) => Promise<unknown>;
}) {
  fastify[type]<{ Querystring: { fields?: string } }>(
    path,
    { preHandler: protect },
    async (req, reply) => {
      const data = await handler(req, reply);

      sendResponse(req, reply, fieldName, data);
    }
  );
}
