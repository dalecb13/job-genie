import { createBrowserRouter } from "react-router";
import Providers from "../providers";
import SignInPage from "../pages/sign-in.page";
import SignUpPage from "../pages/sign-up.page";
import AuthProtectedRoute from "./auth-protected-route";
import HomePage from "../pages/home.page";
import CompaniesPage from "../pages/companies.page";
import CreateCompanyPage from "../pages/companies-create.page";
import JobDescriptionsPage from "../pages/job-descriptions.page";
import CreateJobDescriptionPage from "../pages/job-descriptions-create.page";
import ApplicationsPage from "../pages/applications.page";
import ApplicationStartPage from "../pages/application-start.page";
import ApplicationPage from "@/pages/application.page";
import JobDescriptionDetailsPage from "@/pages/job-description-details.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },

      // Auth Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/companies",
            element: <CompaniesPage />,
          },
          {
            path: "/companies/create",
            element: <CreateCompanyPage />,
          },
          {
            path: "/job-descriptions",
            element: <JobDescriptionsPage />,
          },
          {
            path: "/job-descriptions/create",
            element: <CreateJobDescriptionPage />,
          },
          {
            path: "/job-descriptions/:id",
            element: <JobDescriptionDetailsPage />,
          },
          {
            path: "/applications",
            element: <ApplicationsPage />,
          },
          {
            path: "/applications/start",
            element: <ApplicationStartPage />,
          },
          {
            path: "/applications/:id",
            element: <ApplicationPage />,
          }
        ],
      },
    ]
  },
]);

export default router;
