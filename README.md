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
  <a aria-label="License">
    <img alt="MIT License" src="https://img.shields.io/github/license/wkedzierawski/react-scroll-router?style=for-the-badge&label=license">
  </a>
</p>

<pre align="center">npm i react-scroll-router</pre>
<pre align="center">yarn add react-scroll-router</pre>
<hr>

A React package for routing between sections on a single page application

[CodeSandbox demo](https://codesandbox.io/p/sandbox/react-scroll-router-demo-6n8sx4)

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

# API

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

### useScrollToRoute()

```ts
export const useScrollToRoute: () => ({route: string; scrollOptions?: ScrollIntoViewOptions}) => void;
```

#### Returns `Function` that can scroll your page to the selected route

```jsx harmony
  const scrollToRoute = useScrollToRoute()
  const scrollOptions = {behavior: "smooth"} // By default behavior value is set to "smooth"

  <button onClick={()=> scrollToRoute({route:'/section', scrollOptions})} />
```

# LICENSE

MIT
