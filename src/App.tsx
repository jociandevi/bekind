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
import ErrorPage404 from "./components/shared/errorPage404";
import PrivacyPolicy from "./components/shared/privacyPolicy";
import TermsAndConditions from "./components/shared/termsAndConditions";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./common/store";
import Loading from "./components/shared/loading";

const Login = lazy(() => import("./components/randomactsofkindness/login"));
const Profile = lazy(() => import("./components/randomactsofkindness/profile"));
const AddNew = lazy(() => import("./components/randomactsofkindness/addNew"));
const AddEditBadge = lazy(
  () => import("./components/randomactsofkindness/addEditBadge")
);
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
        path=""
        element={
          <Suspense fallback={<Loading />}>
            <RandomActOfKindnessList />
          </Suspense>
        }
      />
      <Route
        path=":id/:title"
        element={
          <Suspense fallback={<Loading />}>
            <KindnessDetails />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="new"
        element={
          <Suspense fallback={<Loading />}>
            <AddNew />
          </Suspense>
        }
      />
      <Route
        path="edit/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AddNew />
          </Suspense>
        }
      />
      <Route
        path="new-badge"
        element={
          <Suspense fallback={<Loading />}>
            <AddEditBadge />
          </Suspense>
        }
      />
      <Route
        path="edit-badge/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AddEditBadge />
          </Suspense>
        }
      />
      <Route
        path="privacy-policy"
        element={
          <Suspense fallback={<Loading />}>
            <PrivacyPolicy />
          </Suspense>
        }
      />
      <Route
        path="terms-and-conditions"
        element={
          <Suspense fallback={<Loading />}>
            <TermsAndConditions />
          </Suspense>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={{ ...theme }}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
