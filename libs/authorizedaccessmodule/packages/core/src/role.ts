export interface IRole<T = string> {
  readonly name: string;
  readonly role: T;
  able(role: T): boolean;
}

export interface RoleOptions<T = string> {
  name: string;
  role: T;
}

export class Role<T = string> implements IRole<T> {
  readonly name: string;
  readonly role: T;

  constructor(options: RoleOptions<T>) {
    this.name = options.name;
    this.role = options.role;
  }

  able(permission: T): boolean {
    return this.checkPermission(permission);
  }

  private checkPermission(permission: T) {
    return this.role === permission;
  }
}
