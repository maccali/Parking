import { NextApiRequest } from "next";
import { EnvHelper } from "shared/utils/envHelper";
import { LoginRightSolver } from "shared/solvers/right/loginRightSolver";
import { LoginLeftSolver } from "shared/solvers/left/loginLeftSolver";
import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";

import jwt from "jsonwebtoken";

const jwtKey = EnvHelper.jwtKey;

export async function autenticationMiddleware(
  request: NextApiRequest
): Promise<Either<IError, ISuccess>> {
  const { token } = request.headers;

  try {
    const valid = await jwt.verify(String(token), String(jwtKey));

    console.log("valid", valid);
    if (valid.id) {
      return right(LoginRightSolver.loginRight(valid));
    }

    return left(LoginLeftSolver.leftAuth());
  } catch (error) {
    console.log("error ---", error);
    return left(LoginLeftSolver.leftAuth());
  }
}
