// src/Provider.tsx
import { createContext, useState } from "react";
import { jsx } from "react/jsx-runtime";
var ScrollContext = createContext({});
var ScrollProvider = ({ children, defaultRoute }) => {
  const [route, setRoute] = useState(defaultRoute);
  return /* @__PURE__ */ jsx(ScrollContext.Provider, { value: { route, setRoute }, children });
};

// src/hooks.ts
import { useCallback, useContext } from "react";

// src/Router.ts
var ScrollEvent = /* @__PURE__ */ ((ScrollEvent2) => {
  ScrollEvent2["SCROLL_TO_ROUTE"] = "SCROLL_TO_ROUTE";
  return ScrollEvent2;
})(ScrollEvent || {});
var ScrollRouter = class {
  static eventTarget = new EventTarget();
  static getHistoryState = () => history.state;
  static dispatchEvent = (event, payload) => [
    this.eventTarget.dispatchEvent(new CustomEvent(event, { detail: payload }))
  ];
  static addListener = (event, callback) => {
    this.eventTarget.addEventListener(
      event,
      callback
    );
    return () => this.eventTarget.removeEventListener(
      event,
      callback
    );
  };
};

// src/hooks.ts
var useScrollRouter = () => {
  const { route, setRoute } = useContext(ScrollContext);
  const replaceHistory = useCallback(
    (nextRoute) => {
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
var useScrollRouteEvents = () => {
  const scrollToRoute = useCallback((route) => {
    ScrollRouter.dispatchEvent("SCROLL_TO_ROUTE" /* SCROLL_TO_ROUTE */, route);
  }, []);
  return { scrollToRoute };
};

// src/Route.tsx
import { memo, useCallback as useCallback2, useEffect, useRef } from "react";
import styled from "styled-components";

// src/utils.ts
var isBetween = (value, min, max) => {
  return value >= min && value < max;
};

// src/Route.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var safetyMargin = -10;
var ScrollRoute = memo(({ children, route }) => {
  const ref = useRef(null);
  const { replaceHistory } = useScrollRouter();
  const onPageScroll = useCallback2(() => {
    if (!ref.current) {
      return;
    }
    const dimensions = ref.current.getClientRects()?.[0];
    if (!dimensions) {
      return;
    }
    const offsetFromTop = -dimensions.y;
    const currentSection = isBetween(
      offsetFromTop,
      0 + safetyMargin,
      dimensions.height + safetyMargin
    );
    currentSection && replaceHistory(route);
  }, [replaceHistory, route]);
  const scrollActiveRouteIntoView = useCallback2(() => {
    if (window.location.pathname !== route) {
      return;
    }
    ref.current?.scrollIntoView();
  }, [route]);
  useEffect(scrollActiveRouteIntoView, [scrollActiveRouteIntoView]);
  useEffect(() => {
    window.addEventListener("scroll", onPageScroll);
    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, [onPageScroll, scrollActiveRouteIntoView]);
  useEffect(() => {
    const removeListener = ScrollRouter.addListener(
      "SCROLL_TO_ROUTE" /* SCROLL_TO_ROUTE */,
      ({ detail: payload }) => {
        if (payload === route) {
          ref.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    );
    return removeListener;
  }, [route]);
  return /* @__PURE__ */ jsx2(Container, { ref, children });
});
var Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export {
  ScrollContext,
  ScrollEvent,
  ScrollProvider,
  ScrollRoute,
  ScrollRouter,
  useScrollRouteEvents,
  useScrollRouter
};
