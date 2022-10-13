export class CreateUserInput {
  email: string;
  name: string;
  role: 'Admin' | 'User';
}
