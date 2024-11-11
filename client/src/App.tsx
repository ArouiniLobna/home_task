import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
// Lazy load route components for better performance
const AccountsOverview = lazy(() => import("./pages/AccountsOverview"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Trackers = lazy(() => import("./pages/Trackers"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <AccountsOverview /> }, // Home page route
      {
        path: "/transactions/:accountId?",
        element: <Transactions />,
        // loader: async ({ request, params }) => {
        //   return fetch(
        //     `/fake/api/teams/${params.teamId}.json`,
        //     { signal: request.signal }
        //   );
        // },

        // // and renders this element in case something went wrong
        // errorElement: <ErrorBoundary />,
      }, // About page route
      { path: "/trackers", element: <Trackers /> }, // Contact page route
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
