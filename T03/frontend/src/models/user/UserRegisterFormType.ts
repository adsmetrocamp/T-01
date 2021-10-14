export class UserRegisterFormType {
  name: string = "";
  email: string = "";
  cpf: string = "";
  birthDate!: Date;
  acceptedTerms: boolean = false;
}
export class UserPasswordRegisterFormType {
  password: string = "";
  passwordConfirmation: string = "";
}
