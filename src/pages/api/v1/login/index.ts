import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";

import { CreateAccount } from "app/appServices/createAccount";
import { UpdateAccount } from "app/appServices/updateAccount";
import { ShowAccount } from "app/appServices/showAccount";
import { DeleteAccount } from "app/appServices/deleteAccount";

import { CreateAccountInput } from "app/dtos/CreateAccountDTO";
import { ShowAccountInput } from "app/dtos/ShowAccountDTO";
import { UpdateAccountInput } from "app/dtos/UpdateAccountDTO";

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
    if (request.method !== "POST") {
      const accountCreateValidator = new CreateAccountValidator(request.body);

      const isValidData = await accountCreateValidator.validateData(
        accountCreateValidator
      );

      if (isValidData.isLeft()) {
        return response.status(isValidData.value.statusCode).json({
          describe: isValidData.value.describe,
          result: isValidData.value.result,
        });
      }
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
