import { useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./UI/Card";
import Input from "./UI/Input";
import classes from "./Login.module.css";

const Login = () => {
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  return (
    <Card className={classes.loginCard}>
      <form className={classes.loginForm}>
        <div className={classes.title}>Login</div>
        <Input label={"Your Email"} type={"text"} ref={userNameRef} />
        <Input label={"Password"} type={"password"} ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
        <Link className={classes.link} to="/auth/profile">Create a new account</Link>
    </Card>
  );
};

export default Login;
