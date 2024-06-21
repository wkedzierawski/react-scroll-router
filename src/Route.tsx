import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { ScrollEvent, ScrollRouter } from "./Router";
import { isBetween } from "./utils";
import { useScrollRouter } from "./hooks";

type Props = {
  route: string;
  children: JSX.Element;
};

const safetyMargin = -10;

export const ScrollRoute = memo(({ children, route }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { replaceHistory } = useScrollRouter();

  const onPageScroll = useCallback(() => {
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

  const scrollActiveRouteIntoView = useCallback(() => {
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
      ScrollEvent.SCROLL_TO_ROUTE,
      ({ detail: payload }) => {
        if (payload.route === route) {
          const scrollOptions = payload.scrollOptions || { behavior: "smooth" };
          ref.current?.scrollIntoView(scrollOptions);
        }
      }
    );

    return removeListener;
  }, [route]);

  return <Container ref={ref}>{children}</Container>;
});

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
