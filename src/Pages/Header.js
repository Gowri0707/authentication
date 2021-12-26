import { useCallback } from "react";
import { NavLink, Outlet } from "react-router-dom";
import classes from "./Header.module.css";
const Header = () => {
  const activeClassHandler = useCallback(({ isActive }) => {
    return isActive ? classes.active : classes.normal;
  }, []);
  return (
      <>
    <header className={classes.header}>
      <main>React Auth</main>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink className={activeClassHandler} to="/auth/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className={activeClassHandler} to="/auth/profile">
              Profile
            </NavLink>
          </li>
        </ul>
        <button className={classes.button}>Logout</button>
      </nav>
    </header>
    <Outlet />
    </>
  );
};

export default Header;
