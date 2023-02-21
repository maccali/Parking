import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";

import { AuthAccount } from "app/appServices/authAccount";

import { LoginInput } from "app/dtos/LoginDTO";

import { AdminValidator } from "app/validators/RegisterAdminValidator";

import { PrismaRepositoryFactory } from "shared/infra/factory/PrismaRepositoryFactory";
import { registerAdminMiddleware } from "shared/middlewares/functions/registerAdmin";

import { LoginValidator } from "app/validators/LoginValidator";

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
      const accountCreateValidator = new LoginValidator(request.body);

      const isValidData = await accountCreateValidator.validateData(
        accountCreateValidator
      );

      if (isValidData.isLeft()) {
        return response.status(isValidData.value.statusCode).json({
          describe: isValidData.value.describe,
          result: isValidData.value.result,
        });
      }

      const prismaRepositoryFactory = new PrismaRepositoryFactory();

      const loginInput = new LoginInput(accountCreateValidator);

      const login = new AuthAccount(prismaRepositoryFactory);

      const loginOutput = await login.execute(loginInput);

      return response.status(200).json(loginOutput.value);
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
