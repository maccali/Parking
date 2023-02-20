import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { LoggerInterface } from "shared/infra/logger/logger.interface";

export class FindAdmin {
  repositoryFactory: AbstractRepositoryFactory;
  logger: LoggerInterface;

  constructor(
    repositoryFactory: AbstractRepositoryFactory,
    logger: LoggerInterface
  ) {
    this.repositoryFactory = repositoryFactory;
    this.logger = logger;
  }

  async find(id: string) {
    this.logger.info({ message: "INIT find" });

    this.logger.info({
      message: "EXEC this.repositoryFactory.getAdminRepository",
    });
    const adminRepository = this.repositoryFactory.getAdminRepository();

    this.logger.info({ message: "EXEC adminRepository.findById" });
    const admin = await adminRepository.findById(id);

    this.logger.info({ message: "RETURN OF find" });
    return admin;
  }
}
