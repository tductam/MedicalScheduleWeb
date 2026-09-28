import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "@/router.ts";
import { Toaster } from "sonner";

import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { queryClient } from "./services/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
