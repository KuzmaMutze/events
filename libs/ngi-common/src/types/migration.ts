export interface MigrationType<U = any, V = any> {
  (value: U): V;
}

export declare type Migration = Record<number, MigrationType>;
