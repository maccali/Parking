import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";
import { GenericLeftSolver } from "shared/solvers/left/genericLeftSolver";

import { autenticationMiddleware } from "shared/middlewares/functions/autentication";

import { RegisterEntryValidator } from "app/validators/RegisterEntryValidator";
import { PrismaRepositoryFactory } from "shared/infra/factory/PrismaRepositoryFactory";

import { RegisterEntry } from "app/appServices/registerEntry";

import { RegisterEntryInput } from "app/dtos/RegisterEntryDTO";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await NextCors(request, response, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (request.method !== "POST") {
    return response.status(404).json("");
  }

  const authorize = await autenticationMiddleware(request);
  console.log("authorize", authorize);
  if (authorize.value.statusCode !== 200) {
    return response.status(authorize.value.statusCode).json(authorize.value);
  }

  try {
    const registerEntryValidator = new RegisterEntryValidator(request.body);
    const isValidData = await registerEntryValidator.validateData(
      registerEntryValidator
    );
    if (isValidData.isLeft()) {
      return response.status(isValidData.value.statusCode).json({
        describe: isValidData.value.describe,
        result: isValidData.value.result,
      });
    }

    const prismaRepositoryFactory = new PrismaRepositoryFactory();

    const registerEntryInput = new RegisterEntryInput(registerEntryValidator);

    const registerEntry = new RegisterEntry(prismaRepositoryFactory);

    const createAccountOutput = await registerEntry.execute(registerEntryInput);

    return response.status(200).json(createAccountOutput.value);

  } catch (error) {
    console.log("error", error);
    const leftError = left(GenericLeftSolver.leftGeneric());

    return response.status(leftError.value.statusCode).json({
      describe: leftError.value.describe,
    });
  }
};

export default handler;
