export type Direction = 'asc' | 'desc';

export type Sort = {
  columnId: string;
  direction: Direction;
};

export type Sizes = Record<string, number>;
