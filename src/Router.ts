export enum ScrollEvent {
  SCROLL_TO_ROUTE = "SCROLL_TO_ROUTE",
}

export type ScrollEventPayload = {
  [ScrollEvent.SCROLL_TO_ROUTE]: string;
};

export type HistoryState = {
  route: string;
};

export class ScrollRouter {
  private static eventTarget = new EventTarget();

  public static getHistoryState = (): HistoryState | undefined => history.state;

  public static dispatchEvent = <T extends ScrollEvent>(
    event: T,
    payload: ScrollEventPayload[T]
  ) => [
    this.eventTarget.dispatchEvent(new CustomEvent(event, { detail: payload })),
  ];

  public static addListener = <T extends ScrollEvent>(
    event: T,
    callback: (event: CustomEvent<ScrollEventPayload[T]>) => void
  ) => {
    this.eventTarget.addEventListener(
      event,
      callback as EventListenerOrEventListenerObject
    );

    return () =>
      this.eventTarget.removeEventListener(
        event,
        callback as EventListenerOrEventListenerObject
      );
  };
}
