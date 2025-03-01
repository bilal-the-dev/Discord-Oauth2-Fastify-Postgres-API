import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import AppError from "../structures/AppError.js";

export default function globalDefaultErrorHandler(
  err: AppError | FastifyError | Error,
  _: FastifyRequest,
  reply: FastifyReply
) {
  console.log(err);

  reply
    .status(err instanceof AppError ? err.statusCode : 500)
    .send({ status: "error", message: err.message });
}
