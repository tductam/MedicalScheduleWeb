import { createBrowserRouter } from "react-router";

import { RootLayout } from "@/components/layout/RootLayout";
import { Schedule } from "@/pages/Schedule";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound";
import { Home } from "@/pages/Home";
import { ROUTES } from "@/routes/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: ROUTES.profile,
        Component: Profile,
      },
      {
        path: ROUTES.schedule,
        Component: Schedule,
      },
      {
        path: ROUTES.notFound,
        Component: NotFound,
      },
    ],
  },
]);
