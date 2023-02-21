export class LoginInput {
  nickname: string;
  password: string;

  constructor({ nickname, password }: LoginInput) {
    this.nickname = nickname;
    this.password = password;
  }
}
