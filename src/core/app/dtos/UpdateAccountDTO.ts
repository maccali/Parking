export class UpdateAccountInput {
  id: string;
  nickname: string;
  password: string;

  constructor({ id, nickname, password }: UpdateAccountInput) {
    this.id = id;
    this.nickname = nickname;
    this.password = password;
  }
}
