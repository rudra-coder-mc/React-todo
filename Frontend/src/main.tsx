import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Ensure App.tsx exists
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
