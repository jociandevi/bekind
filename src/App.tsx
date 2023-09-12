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

const Login = lazy(() => import("./components/login/login"));
const Profile = lazy(() => import("./components/randomactsofkindness/profile"));
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
            <ConfigProvider theme={{ ...theme }}>
              <RandomActOfKindnessList />
            </ConfigProvider>
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<>...</>}>
            <ConfigProvider theme={{ ...theme }}>
              <Profile />
            </ConfigProvider>
          </Suspense>
        }
      />
      <Route
        path="new"
        element={
          <Suspense fallback={<>...</>}>
            <ConfigProvider theme={{ ...theme }}>
              <AddNew />
            </ConfigProvider>
          </Suspense>
        }
      />
      <Route
        path=""
        element={
          <Suspense fallback={<>...</>}>
            <ConfigProvider theme={{ ...theme }}>
              <Login />
            </ConfigProvider>
          </Suspense>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
