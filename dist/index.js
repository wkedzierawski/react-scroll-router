"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ScrollContext: () => ScrollContext,
  ScrollEvent: () => ScrollEvent,
  ScrollProvider: () => ScrollProvider,
  ScrollRoute: () => ScrollRoute,
  ScrollRouter: () => ScrollRouter,
  useScrollRouteEvents: () => useScrollRouteEvents,
  useScrollRouter: () => useScrollRouter
});
module.exports = __toCommonJS(src_exports);

// src/Provider.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var ScrollContext = (0, import_react.createContext)({});
var ScrollProvider = ({ children, defaultRoute }) => {
  const [route, setRoute] = (0, import_react.useState)(defaultRoute);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollContext.Provider, { value: { route, setRoute }, children });
};

// src/hooks.ts
var import_react2 = require("react");

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
  const { route, setRoute } = (0, import_react2.useContext)(ScrollContext);
  const replaceHistory = (0, import_react2.useCallback)(
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
  const scrollToRoute = (0, import_react2.useCallback)((route) => {
    ScrollRouter.dispatchEvent("SCROLL_TO_ROUTE" /* SCROLL_TO_ROUTE */, route);
  }, []);
  return { scrollToRoute };
};

// src/Route.tsx
var import_react3 = require("react");
var import_styled_components = __toESM(require("styled-components"));

// src/utils.ts
var isBetween = (value, min, max) => {
  return value >= min && value < max;
};

// src/Route.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var safetyMargin = -10;
var ScrollRoute = (0, import_react3.memo)(({ children, route }) => {
  const ref = (0, import_react3.useRef)(null);
  const { replaceHistory } = useScrollRouter();
  const onPageScroll = (0, import_react3.useCallback)(() => {
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
  const scrollActiveRouteIntoView = (0, import_react3.useCallback)(() => {
    if (window.location.pathname !== route) {
      return;
    }
    ref.current?.scrollIntoView();
  }, [route]);
  (0, import_react3.useEffect)(scrollActiveRouteIntoView, [scrollActiveRouteIntoView]);
  (0, import_react3.useEffect)(() => {
    window.addEventListener("scroll", onPageScroll);
    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, [onPageScroll, scrollActiveRouteIntoView]);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Container, { ref, children });
});
var Container = import_styled_components.default.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollContext,
  ScrollEvent,
  ScrollProvider,
  ScrollRoute,
  ScrollRouter,
  useScrollRouteEvents,
  useScrollRouter
});
