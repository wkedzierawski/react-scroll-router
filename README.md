<hr>
<div align="center">
  <h1 align="center">
    react-scroll-router
  </h1>
</div>

<p align="center">
  <a aria-label="Types" href="https://www.npmjs.com/package/react-scroll-router">
    <img alt="Types" src="https://img.shields.io/npm/types/react-scroll-router?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/react-scroll-router">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/react-scroll-router?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/react-scroll-router?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i react-scroll-router</pre>
<pre align="center">yarn add react-scroll-router</pre>
<hr>

A React package for routing between sections on a single page application

# Quick Start

## Setup Provider

```jsx harmony
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ScrollProvider } from "react-scroll-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ScrollProvider defaultRoute={'/'}>
      <App />
    </ScrollProvider>
  </React.StrictMode>
);
```

## Add routes

```jsx harmony
import { ScrollRoute } from "react-scroll-router";

function App() {
  return (
    <div>
      <ScrollRoute route={"/"} children={<ExampleHeaderComponent />} />
      <ScrollRoute route={"/section"} children={<ExampleSectionComponent />} />
      <ScrollRoute route={"/footer"} children={<ExampleFooterComponent3 />} />
    </div>
  );
}
```

## API

### useScrollRouter()

```ts
export const useScrollRouter: () => {
  route: string;
  replaceHistory: (nextRoute: string) => void;
  pushHistory: (nextRoute: string) => void;
};
```

#### Returns `{route,replaceHistory,pushHistory}`

| Variable       | Type       | Description                              |
| -------------- | ---------- | ---------------------------------------- |
| route          | `string`   | The current route                        |
| replaceHistory | `Function` | Function to manual replace history state |
| pushHistory    | `Function` | Function to manual push history state    |

## LICENSE

MIT