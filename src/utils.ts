export const isBetween = (value: number, min: number, max: number) => {
  return value >= min && value < max;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
