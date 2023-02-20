export class CreateAccountInput {
  nickname: string;
  password: string;

  constructor({ nickname, password }: CreateAccountInput) {
    this.nickname = nickname;
    this.password = password;
  }
}
