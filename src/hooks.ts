import { useCallback, useContext } from "react";
import { ScrollContext } from "./Provider";
import { ScrollEvent, ScrollRouter } from "./Router";

export const useScrollRouter = () => {
  const { route, setRoute } = useContext(ScrollContext);

  const replaceHistory = useCallback(
    (nextRoute: string) => {
      const state = ScrollRouter.getHistoryState();
      if (state?.route === nextRoute) {
        return;
      }

      setRoute(nextRoute);

      const url = new URL(window.location.href);
      url.pathname = nextRoute;
      history.replaceState({ route: nextRoute }, "", url.href);
    },
    [setRoute]
  );

  return { route, replaceHistory };
};

export const useScrollRouteEvents = () => {
  const scrollToRoute = useCallback((route: string) => {
    ScrollRouter.dispatchEvent(ScrollEvent.SCROLL_TO_ROUTE, route);
  }, []);

  return { scrollToRoute };
};
