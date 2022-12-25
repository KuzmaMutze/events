export interface Migration<U = any, V = any> {
  (value: U): V;
}

export type Migrations = Record<number, Migration>;
