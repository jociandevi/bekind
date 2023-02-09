import { lazy } from "react";

const Login = lazy(() => import("./components/login/login"));

function App() {
  return <Login />;
}

export default App;
