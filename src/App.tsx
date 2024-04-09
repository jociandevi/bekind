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

const Login = lazy(
  () =>
    import(
      /* webpackChunkName: "login" */ "./components/randomactsofkindness/login"
    )
);
const JoinTheMovement = lazy(
  () =>
    import(
      /* webpackChunkName: "join-the-movement" */ "./components/randomactsofkindness/joinTheMovement"
    )
);
const AddEditPages = lazy(
  () =>
    import(
      /* webpackChunkName: "add-edit-pages" */ "./components/randomactsofkindness/addEditPages"
    )
);
const Profile = lazy(
  () =>
    import(
      /* webpackChunkName: "profile" */ "./components/randomactsofkindness/profile"
    )
);

const KindnessDetails = lazy(
  () =>
    import(
      /* webpackChunkName: "action-details" */ "./components/randomactsofkindness/kindnessDetails"
    )
);
const RandomActOfKindnessList = lazy(
  () =>
    import(
      /* webpackChunkName: "main-list-page" */ "./components/randomactsofkindness/randomActsOfKindnessList"
    )
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
        path="edit/:type/:id"
        element={
          <Suspense fallback={<Loading />}>
            <AddEditPages />
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
        path="join"
        element={
          <Suspense fallback={<Loading />}>
            <JoinTheMovement />
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
