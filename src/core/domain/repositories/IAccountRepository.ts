import { Account } from "domain/entities/Account";

export interface IAccountRepository {
  findById(id: string): Promise<Account>;
  deleteById(id: string): Promise<Account>;
  save(account: Account): Promise<Account>;
  update(account: Account): Promise<Account>;
}
