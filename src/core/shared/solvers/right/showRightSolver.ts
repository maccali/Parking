import { ISuccess } from "shared/ISuccess";

export class ShowRightSolver extends ISuccess {
  static rightShowed(result: any): ISuccess {
    const rightShowedSolver = new ShowRightSolver({
      statusCode: 200,
      describe: {
        code: "SS-001",
        project: "ACCOUNT",
        message: "Showed Succesfully",
        shortMessage: "showedSuccesfully",
      },
      result,
    });
    return rightShowedSolver;
  }
}
