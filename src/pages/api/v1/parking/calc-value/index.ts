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

const USER_POOL_ID = EnvHelper.adminPoolId;
const CLIENT_ID = EnvHelper.adminClientPoolId;

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  await NextCors(request, response, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    const authorize = await registerAdminMiddleware(request, logger);

    if (authorize.status !== 200) {
      return response.status(authorize.status).json(authorize.message);
    }

    const adminValidator = new AdminValidator(request.body);

    const isValidData = await adminValidator.validateData(adminValidator);

    if (isValidData.isLeft()) {
      return response.status(isValidData.value.statusCode).json({
        describe: isValidData.value.describe,
        result: isValidData.value.result,
      });
    }

    const cognitoProvider = new CognitoProvider(
      USER_POOL_ID,
      CLIENT_ID,
      logger
    );

    const dynamoRepositoryFactory = new DynamoRepositoryFactory(logger);

    const registerAdmin = new RegisterAdmin(
      dynamoRepositoryFactory,
      cognitoProvider
    );

    const registerAdminInput = new RegisterAdminInput(adminValidator);

    const registerAdminOutput = await registerAdmin.execute(registerAdminInput);

    return response.status(200).json(registerAdminOutput);
  } catch (error) {
    const leftError = left(GenericLeftSolver.leftGeneric());

    return response.status(leftError.value.statusCode).json({
      describe: leftError.value.describe,
    });
  }
};

export default handler;
