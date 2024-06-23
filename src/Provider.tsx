import { Dispatch, SetStateAction, createContext, useState } from "react";

export type ScrollRouterOptions = {
  /** Offset value from the top of the viewport that defines the switch to a new route.
   *  @defaultValue `-10`
   */

  offset: number;
};

const defaultOptions: ScrollRouterOptions = {
  offset: -10,
};

type Props = {
  children: JSX.Element;
  defaultRoute: string;
  options?: ScrollRouterOptions;
};

type ScrollContextType = {
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
  options: ScrollRouterOptions;
};

export const ScrollContext = createContext({} as ScrollContextType);

export const ScrollProvider = ({
  children,
  defaultRoute,
  options = defaultOptions,
}: Props) => {
  const [route, setRoute] = useState<string>(defaultRoute);

  return (
    <ScrollContext.Provider value={{ route, setRoute, options }}>
      {children}
    </ScrollContext.Provider>
  );
};
