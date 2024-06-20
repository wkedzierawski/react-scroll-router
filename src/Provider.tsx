import { Dispatch, SetStateAction, createContext, useState } from "react";

type ScrollContextType = {
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
};

export const ScrollContext = createContext({} as ScrollContextType);

type Props = {
  children: JSX.Element;
  defaultRoute: string;
};

export const ScrollProvider = ({ children, defaultRoute }: Props) => {
  const [route, setRoute] = useState<string>(defaultRoute);

  return (
    <ScrollContext.Provider value={{ route, setRoute }}>
      {children}
    </ScrollContext.Provider>
  );
};
