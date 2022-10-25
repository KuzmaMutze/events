export type CreateUserData = {
  email: string;
  password: string;
  name: string;
  role: 'Admin' | 'User';
};
