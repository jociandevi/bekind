import { ConfigProvider } from "antd";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { theme } from "./common/theme";
import { AuthProvider } from "./common/authProvider";
import ErrorPage404 from "./components/shared/errorPage404";
import PrivacyPolicy from "./components/shared/privacyPolicy";
import TermsAndConditions from "./components/shared/termsAndConditions";

const Login = lazy(() => import("./components/randomactsofkindness/login"));
const Profile = lazy(() => import("./components/randomactsofkindness/profile"));
const Statistics = lazy(
  () => import("./components/randomactsofkindness/statistics")
);
const AddNew = lazy(() => import("./components/randomactsofkindness/addNew"));
const KindnessDetails = lazy(
  () => import("./components/randomactsofkindness/kindnessDetails")
);
const RandomActOfKindnessList = lazy(
  () => import("./components/randomactsofkindness/randomActsOfKindnessList")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />} errorElement={<ErrorPage404 />}>
      <Route
        path="kindness"
        element={
          <Suspense fallback={<>...</>}>
            <RandomActOfKindnessList />
          </Suspense>
        }
      />
      <Route
        path="kindness/:title"
        element={
          <Suspense fallback={<>...</>}>
            <KindnessDetails />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<>...</>}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="statistics"
        element={
          <Suspense fallback={<>...</>}>
            <Statistics />
          </Suspense>
        }
      />
      <Route
        path="new"
        element={
          <Suspense fallback={<>...</>}>
            <AddNew />
          </Suspense>
        }
      />
      <Route
        path="privacy-policy"
        element={
          <Suspense fallback={<>...</>}>
            <PrivacyPolicy />
          </Suspense>
        }
      />
      <Route
        path="terms-and-conditions"
        element={
          <Suspense fallback={<>...</>}>
            <TermsAndConditions />
          </Suspense>
        }
      />

      <Route
        path=""
        element={
          <Suspense fallback={<>...</>}>
            <Login />
          </Suspense>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <ConfigProvider theme={{ ...theme }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
