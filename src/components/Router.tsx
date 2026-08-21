import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProgramsPage from '@/components/pages/ProgramsPage';
import AboutPage from '@/components/pages/AboutPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import ContactPage from '@/components/pages/ContactPage';
import CommunityEventsPage from '@/components/pages/CommunityEventsPage';
import MeetTheTeamPage from '@/components/pages/MeetTheTeamPage';
import GetInvolvedPage from '@/components/pages/GetInvolvedPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "programs",
        element: <ProgramsPage />,
        routeMetadata: {
          pageIdentifier: 'programs',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "resources",
        element: <ResourcesPage />,
        routeMetadata: {
          pageIdentifier: 'resources',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "events",
        element: <CommunityEventsPage />,
        routeMetadata: {
          pageIdentifier: 'events',
        },
      },
      {
        path: "team",
        element: <MeetTheTeamPage />,
        routeMetadata: {
          pageIdentifier: 'team',
        },
      },
      {
        path: "get-involved",
        element: <GetInvolvedPage />,
        routeMetadata: {
          pageIdentifier: 'get-involved',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
