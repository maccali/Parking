import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { left } from "shared/either";
import { GenericLeftSolver } from "shared/solvers/left/genericLeftSolver";

import { autenticationMiddleware } from "shared/middlewares/functions/autentication";

import { RegisterCalcValidator } from "app/validators/RegisterCalcValidator";
import { PrismaRepositoryFactory } from "shared/infra/factory/PrismaRepositoryFactory";

import { CalcValue } from "app/appServices/calcValue";

import { RegisterCalcInput } from "app/dtos/RegisterCalcDTO";

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
    const registerCalcValidator = new RegisterCalcValidator(request.body);
    const isValidData = await registerCalcValidator.validateData(
      registerCalcValidator
    );
    if (isValidData.isLeft()) {
      return response.status(isValidData.value.statusCode).json({
        describe: isValidData.value.describe,
        result: isValidData.value.result,
      });
    }

    const prismaRepositoryFactory = new PrismaRepositoryFactory();

    const registerCalcInput = new RegisterCalcInput(registerCalcValidator);

    const registerCalc = new CalcValue(prismaRepositoryFactory);

    const registerCalcOutput = await registerCalc.execute(registerCalcInput);

    return response.status(200).json(registerCalcOutput.value);
  } catch (error) {
    console.log("error", error);
    const leftError = left(GenericLeftSolver.leftGeneric());

    return response.status(leftError.value.statusCode).json({
      describe: leftError.value.describe,
    });
  }
};

export default handler;
