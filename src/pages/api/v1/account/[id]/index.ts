import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";

import { DeleteAccount } from "app/appServices/deleteAccount";
import { UpdateAccount } from "app/appServices/updateAccount";
import { ShowAccount } from "app/appServices/showAccount";

import { DeleteAccountInput } from "app/dtos/DeleteAccountDTO";
import { ShowAccountInput } from "app/dtos/ShowAccountDTO";
import { UpdateAccountInput } from "app/dtos/UpdateAccountDTO";

import { UpdateAccountValidator } from "app/validators/UpdateAccountValidator";

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
    const { id } = request.query;

    if (request.method == "PUT") {
      // Registra conta
      const accountUpdateValidator = new UpdateAccountValidator(request.body);

      const isValidData = await accountUpdateValidator.validateData(
        accountUpdateValidator
      );

      if (isValidData.isLeft()) {
        return response.status(isValidData.value.statusCode).json({
          describe: isValidData.value.describe,
          result: isValidData.value.result,
        });
      }

      const prismaRepositoryFactory = new PrismaRepositoryFactory();

      const updateAccountInput = new UpdateAccountInput({
        ...accountUpdateValidator,
        id: String(id),
      });

      const updateAccount = new UpdateAccount(prismaRepositoryFactory);

      const createAccountOutput = await updateAccount.execute(
        updateAccountInput
      );

      return response.status(200).json(createAccountOutput.value);
    }

    if (request.method == "GET") {
      // Busca conta
      const prismaRepositoryFactory = new PrismaRepositoryFactory();

      const showAccountInput = new ShowAccountInput({
        id: String(id),
      });

      const showAccount = new ShowAccount(prismaRepositoryFactory);

      const showAccountOutput = await showAccount.execute(showAccountInput);

      return response.status(200).json(showAccountOutput.value);
    }

    if (request.method == "DELETE") {
      const prismaRepositoryFactory = new PrismaRepositoryFactory();

      const deleteAccountInput = new DeleteAccountInput({
        id: String(id),
      });

      const deleteAccount = new DeleteAccount(prismaRepositoryFactory);

      const deleteAccountOutput = await deleteAccount.execute(
        deleteAccountInput
      );

      return response.status(200).json(deleteAccountOutput.value);
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
