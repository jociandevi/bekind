import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

const Login = lazy(() => import("./components/login/login"));
const Parent = lazy(() => import("./components/pickmeup/parent"));
const Teacher = lazy(() => import("./components/pickmeup/teacher"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route
        path="parent"
        element={
          <Suspense fallback={<>...</>}>
            <Parent />
          </Suspense>
        }
      />
      <Route
        path="teacher"
        element={
          <Suspense fallback={<>...</>}>
            <Teacher />
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
