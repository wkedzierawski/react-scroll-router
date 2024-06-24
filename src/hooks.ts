import { useCallback, useContext } from "react";
import { ScrollContext } from "./Provider";
import { ScrollEvent, ScrollEventPayload, ScrollRouter } from "./Router";

export const useScrollRouter = () => {
  const { route, setRoute, options } = useContext(ScrollContext);

  const goToNextRoute = useCallback(
    (nextRoute: string) => {
      const state = ScrollRouter.getHistoryState();
      if (state?.route === nextRoute) {
        return;
      }

      setRoute(nextRoute);

      const url = new URL(window.location.href);
      url.pathname = nextRoute;
      history[options.historyMethod === "push" ? "pushState" : "replaceState"](
        { route: nextRoute },
        "",
        url.href
      );
    },
    [options.historyMethod, setRoute]
  );

  return { route, goToNextRoute, options };
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
