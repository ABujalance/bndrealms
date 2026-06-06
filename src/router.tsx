import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  Outlet,
} from "@tanstack/react-router";
import { LandingPage } from "./components/LandingPage";

/** Canonical route for the mailing-list page. Keep this in sync with any
 *  redirects below and with the static-route emit in vite.config.ts. */
export const NEWSLETTER_PATH = "/newsletter";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

/** The bare domain root is intentionally left free for future content.
 *  For now it just forwards to the newsletter page. */
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: NEWSLETTER_PATH });
  },
});

const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: NEWSLETTER_PATH,
  component: LandingPage,
});

/** Anything unrecognised funnels to the newsletter (it's the only page today). */
const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$",
  beforeLoad: () => {
    throw redirect({ to: NEWSLETTER_PATH });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  newsletterRoute,
  catchAllRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
