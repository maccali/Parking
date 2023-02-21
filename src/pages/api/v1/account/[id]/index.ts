import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";

import { DeleteAccount } from "app/appServices/deleteAccount";
import { CreateAccount } from "app/appServices/createAccount";
import { UpdateAccount } from "app/appServices/updateAccount";

import { CreateAccountInput } from "app/dtos/CreateAccountDTO";
import { ShowAccountInput } from "app/dtos/ShowAccountDTO";
import { UpdateAccountInput } from "app/dtos/UpdateAccountDTO";

import { AdminValidator } from "app/validators/DeleteAccountValidator";
import { AdminValidator } from "app/validators/ShowAccountValidator";
import { AdminValidator } from "app/validators/CreateAccountValidator";

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
    if (request.method == "PUT") {
      // Edita Conta
      return response.status(404).json("");
    }

    if (request.method == "GET") {
      // Busca conta
      return response.status(404).json("");
    }

    if (request.method == "DELETE") {
      // Deleta conta
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
