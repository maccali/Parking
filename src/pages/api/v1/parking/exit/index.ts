import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";
import { GenericLeftSolver } from "shared/solvers/left/genericLeftSolver";

import { autenticationMiddleware } from "shared/middlewares/functions/autentication";

import { RegisterExitValidator } from "app/validators/RegisterExitValidator";

import { PrismaRepositoryFactory } from "shared/infra/factory/PrismaRepositoryFactory";

import { RegisterExit } from "app/appServices/registerExit";

import { RegisterExitInput } from "app/dtos/RegisterExitDTO";

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
    const registerExitValidator = new RegisterExitValidator(request.body);
    const isValidData = await registerExitValidator.validateData(
      registerExitValidator
    );
    if (isValidData.isLeft()) {
      return response.status(isValidData.value.statusCode).json({
        describe: isValidData.value.describe,
        result: isValidData.value.result,
      });
    }

    const prismaRepositoryFactory = new PrismaRepositoryFactory();

    const registerExitInput = new RegisterExitInput(registerExitValidator);

    console.log("registerExitInput", registerExitInput);
    
    const registerExit = new RegisterExit(prismaRepositoryFactory);
    
    const registerExitOutput = await registerExit.execute(registerExitInput);

    return response.status(200).json(registerExitOutput.value);
  } catch (error) {
    console.log("error", error);
    const leftError = left(GenericLeftSolver.leftGeneric());

    return response.status(leftError.value.statusCode).json({
      describe: leftError.value.describe,
    });
  }
};

export default handler;
