import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Profile from "./components/randomactsofkindness/profile";

const Login = lazy(() => import("./components/login/login"));
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
  return <RouterProvider router={router} />;
}

export default App;
