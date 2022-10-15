export class CreateUserInput {
  email: string;
  password: string;
  name: string;
  role: 'Admin' | 'User';
}
