import { ISuccess } from "shared/ISuccess";

export class DeleteRightSolver extends ISuccess {
  static rightDeleted(result: any): ISuccess {
    const rightDeletedSolver = new DeleteRightSolver({
      statusCode: 200,
      describe: {
        code: "DS-001",
        project: "ACCOUNT",
        message: "Deleted Succesfully",
        shortMessage: "deletedSuccesfully",
      },
      result,
    });
    return rightDeletedSolver;
  }
}
