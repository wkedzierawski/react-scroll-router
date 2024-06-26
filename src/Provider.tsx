import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { DeepPartial } from "./utils";

export type ScrollRouterOptions = {
  /** Offset value from the top of the viewport that defines the switch to a new route.
   *  @defaultValue `-10`
   */
  offset: number;
  /** Method for history to insert new route.
   *  @defaultValue `replace`
   */
  historyMethod: "push" | "replace";
  /** Default page title to fallback if `<Route pageTitle={...} />` is not provided
   *  @defaultValue `document.title`
   */
  pageTitle: string;
};

const defaultOptions: ScrollRouterOptions = {
  offset: -10,
  historyMethod: "replace",
  pageTitle: document.title,
};

type Props = {
  children: JSX.Element;
  /**
   * @defaultValue `'/'`
   */
  defaultRoute?: string;
  options?: DeepPartial<ScrollRouterOptions>;
};

type ScrollContextType = {
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
  options: ScrollRouterOptions;
};

export const ScrollContext = createContext({} as ScrollContextType);

export const ScrollProvider = ({
  children,
  defaultRoute = "/",
  options = {},
}: Props) => {
  const [route, setRoute] = useState<string>(defaultRoute);

  const optionsWithDefaults = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [options]
  );

  return (
    <ScrollContext.Provider
      value={{ route, setRoute, options: optionsWithDefaults }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
