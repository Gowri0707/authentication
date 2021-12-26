import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

const Header = lazy(() => import("./Pages/Header"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="" element={<Navigate to="/auth/" />}></Route>
          <Route path="/auth/*" element={<Header />}>
            <Route path="" element={<h1>Welcome OnBoard</h1>} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
