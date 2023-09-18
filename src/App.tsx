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

const Login = lazy(() => import("./components/randomactsofkindness/login"));
const Profile = lazy(() => import("./components/randomactsofkindness/profile"));
const Statistics = lazy(
  () => import("./components/randomactsofkindness/statistics")
);
const AddNew = lazy(() => import("./components/randomactsofkindness/addNew"));
const RandomActOfKindnessList = lazy(
  () => import("./components/randomactsofkindness/randomActsOfKindnessList")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route
        path="random-act-of-kindness"
        element={
          <Suspense fallback={<>...</>}>
            <RandomActOfKindnessList />
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
