export class UpdateUserInput {
  id: number;
  email: string;
  name: string;
  role: 'Admin' | 'User';
}
