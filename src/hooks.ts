import { useCallback, useContext } from "react";
import { ScrollContext } from "./Provider";
import { ScrollEvent, ScrollEventPayload, ScrollRouter } from "./Router";

export const useScrollRouter = () => {
  const { route, setRoute, options } = useContext(ScrollContext);

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

  const pushHistory = useCallback(
    (nextRoute: string) => {
      const state = ScrollRouter.getHistoryState();
      if (state?.route === nextRoute) {
        return;
      }

      setRoute(nextRoute);

      const url = new URL(window.location.href);
      url.pathname = nextRoute;
      history.pushState({ route: nextRoute }, "", url.href);
    },
    [setRoute]
  );

  return { route, replaceHistory, pushHistory, options };
};

export const useScrollToRoute = () => {
  const scrollToRoute = useCallback(
    (payload: ScrollEventPayload[ScrollEvent.SCROLL_TO_ROUTE]) => {
      ScrollRouter.dispatchEvent(ScrollEvent.SCROLL_TO_ROUTE, payload);
    },
    []
  );

  return scrollToRoute;
};
