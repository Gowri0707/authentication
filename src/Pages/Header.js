import { useCallback, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./Header.module.css";
const Header = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const activeClassHandler = useCallback(({ isActive }) => {
    return isActive ? classes.active : classes.normal;
  }, []);

  const buttonClickHandler = () => {
    authCtx.logout();
    navigate("/");
  }
  return (
      <>
    <header className={classes.header}>
      <main>React Auth</main>
      <nav className={classes.nav}>
        <ul>
          {!authCtx.isLoggedIn && <li>
            <NavLink className={activeClassHandler} to="/auth/login">
              Login
            </NavLink>
          </li>}
          {authCtx.isLoggedIn && <li>
            <NavLink className={activeClassHandler} to="/auth/profile">
              Profile
            </NavLink>
          </li>}
        </ul>
        {authCtx.isLoggedIn && <button onClick={buttonClickHandler} className={classes.button}>Logout</button>}
      </nav>
    </header>
    <Outlet />
    </>
  );
};

export default Header;
