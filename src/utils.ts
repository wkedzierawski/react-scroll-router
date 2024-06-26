export const isBetween = (value: number, min: number, max: number) => {
  return value >= min && value < max;
};

export const changePageTitle = (title: string) => {
  document.title = title;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
