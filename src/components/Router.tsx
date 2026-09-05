import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProgramsPage from '@/components/pages/ProgramsPage';
import ProgramDetailPage from '@/components/pages/ProgramDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import ReadingCollectionPage from '@/components/pages/ReadingCollectionPage';
import ContactPage from '@/components/pages/ContactPage';
import CommunityEventsPage from '@/components/pages/CommunityEventsPage';
import MeetTheTeamPage from '@/components/pages/MeetTheTeamPage';
import GetInvolvedPage from '@/components/pages/GetInvolvedPage';
import BecomeAMentorPage from '@/components/pages/BecomeAMentorPage';
import VolunteerYourSkillsPage from '@/components/pages/VolunteerYourSkillsPage';
import DonationPage from '@/components/pages/DonationPage';
import SpreadTheWordPage from '@/components/pages/SpreadTheWordPage';

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
        path: "programs/:id",
        element: <ProgramDetailPage />,
        routeMetadata: {
          pageIdentifier: 'program-detail',
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
        path: "reading-collection",
        element: <ReadingCollectionPage />,
        routeMetadata: {
          pageIdentifier: 'reading-collection',
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
        path: "become-a-mentor",
        element: <BecomeAMentorPage />,
        routeMetadata: {
          pageIdentifier: 'become-a-mentor',
        },
      },
      {
        path: "volunteer-your-skills",
        element: <VolunteerYourSkillsPage />,
        routeMetadata: {
          pageIdentifier: 'volunteer-your-skills',
        },
      },
      {
        path: "donation",
        element: <DonationPage />,
        routeMetadata: {
          pageIdentifier: 'donation',
        },
      },
      {
        path: "spread-the-word",
        element: <SpreadTheWordPage />,
        routeMetadata: {
          pageIdentifier: 'spread-the-word',
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
