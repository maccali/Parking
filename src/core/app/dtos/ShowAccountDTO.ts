export class ShowAccountInput {
  nickname: string;

  constructor({ nickname }: ShowAccountInput) {
    this.nickname = nickname;
  }
}
