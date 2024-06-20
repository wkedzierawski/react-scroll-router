import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { Dispatch, SetStateAction } from 'react';

type ScrollContextType = {
    route: string;
    setRoute: Dispatch<SetStateAction<string>>;
};
declare const ScrollContext: react.Context<ScrollContextType>;
type Props$1 = {
    children: JSX.Element;
    defaultRoute: string;
};
declare const ScrollProvider: ({ children, defaultRoute }: Props$1) => react_jsx_runtime.JSX.Element;

declare const useScrollRouter: () => {
    route: string;
    replaceHistory: (nextRoute: string) => void;
};
declare const useScrollRouteEvents: () => {
    scrollToRoute: (route: string) => void;
};

type Props = {
    route: string;
    children: JSX.Element;
};
declare const ScrollRoute: react.MemoExoticComponent<({ children, route }: Props) => react_jsx_runtime.JSX.Element>;

declare enum ScrollEvent {
    SCROLL_TO_ROUTE = "SCROLL_TO_ROUTE"
}
type ScrollEventPayload = {
    [ScrollEvent.SCROLL_TO_ROUTE]: string;
};
type HistoryState = {
    route: string;
};
declare class ScrollRouter {
    private static eventTarget;
    static getHistoryState: () => HistoryState | undefined;
    static dispatchEvent: <T extends ScrollEvent>(event: T, payload: ScrollEventPayload[T]) => boolean[];
    static addListener: <T extends ScrollEvent>(event: T, callback: (event: CustomEvent<ScrollEventPayload[T]>) => void) => () => void;
}

export { type HistoryState, ScrollContext, ScrollEvent, type ScrollEventPayload, ScrollProvider, ScrollRoute, ScrollRouter, useScrollRouteEvents, useScrollRouter };
