import { lazy, Suspense, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/auth-context";

const Header = lazy(() => import("./Pages/Header"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        {!authCtx.isLoggedIn && <Route path="" element={<Navigate to="/auth/login" />}></Route>}
        {authCtx.isLoggedIn &&  <Route path="" element={<Navigate to="/auth/" />} />}
          <Route path="/auth/*" element={<Header />}>
          {authCtx.isLoggedIn &&  <Route path="" element={<h1>Welcome OnBoard</h1>} />}
          {!authCtx.isLoggedIn &&  <Route path="" element={<Navigate to="/auth/login" />}></Route>}
            <Route path="login" element={<Login />} />
            {authCtx.isLoggedIn && <Route path="profile" element={<Profile />} />}
            {!authCtx.isLoggedIn && <Route path="profile" element={<Navigate to="/auth/login" />} />}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
