import { CreateAccount } from "app/appServices/createAccount";

import { CreateAccountInput } from "app/dtos/CreateAccountDTO";

import { CreateAccountValidator } from "app/validators/CreateAccountValidator";

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

      const prismaRepositoryFactory = new PrismaRepositoryFactory();

      const createAccountInput = new CreateAccountInput(accountCreateValidator);

      const createAccount = new CreateAccount(prismaRepositoryFactory);

      const createAccountOutput = await createAccount.execute(
        createAccountInput
      );

      return response.status(200).json(createAccountOutput);
    }

    return response.status(404).json("");
  } catch (error) {
    console.log("error", error);
    const leftError = left(GenericLeftSolver.leftGeneric());
    return response.status(leftError.value.statusCode).json({
      describe: leftError.value.describe,
    });
  }
};

export default handler;
