export class UpdateAccountInput {
  nickname: string;
  password: string;

  constructor({ nickname, password }: UpdateAccountInput) {
    this.nickname = nickname;
    this.password = password;
  }
}
