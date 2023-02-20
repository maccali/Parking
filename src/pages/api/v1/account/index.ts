import { RegisterAdmin } from "app/appServices/createAccount";
import { RegisterAdmin } from "app/appServices/updateAccount";
import { RegisterAdmin } from "app/appServices/showAccount";
import { RegisterAdmin } from "app/appServices/deleteAccount";

import { RegisterAdminInput } from "app/dtos/RegisterAdminDTO";
import { AdminValidator } from "app/validators/RegisterAdminValidator";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";
import { PrismaRepositoryFactory } from "shared/infra/factory/PrismaRepositoryFactory";
import { registerAdminMiddleware } from "shared/middlewares/functions/registerAdmin";
import { GenericLeftSolver } from "shared/solvers/left/genericLeftSolver";
import { EnvHelper } from "shared/utils/envHelper";
import { v4 as uuidv4 } from "uuid";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await NextCors(request, response, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    if (request.method == "POST") {
      // Registra conta
      return response.status(404).json("");
    }

    if (request.method == "PUT") {
      // Edita Conta
      return response.status(404).json("");
    }

    if (request.method == "GET") {
      // Busca conta
      return response.status(404).json("");
    }

    if (request.method == "DELETE") {
      // deleta conta
      return response.status(404).json("");
    }

    return response.status(404).json("");
  } catch (error) {
    const leftError = left(GenericLeftSolver.leftGeneric());

    return response.status(leftError.value.statusCode).json({
      describe: leftError.value.describe,
    });
  }
};

export default handler;
