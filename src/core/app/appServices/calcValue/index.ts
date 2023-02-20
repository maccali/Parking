
import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { FindAdmin } from "../../../domain/domainServices/FindAdmin";

export class CalcValue {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute(email: string, password: string) {}
}