import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./UI/Card";
import Input from "./UI/Input";
import classes from "./Login.module.css";
import axios from "axios";
import AuthContext from "../store/auth-context";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const submitEventHandler = (event) => {
    event.preventDefault();
    const email = userNameRef.current.value;
    const password = passwordRef.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwEzBM-845UR_bHgRKZHcrinhiClooJx0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwEzBM-845UR_bHgRKZHcrinhiClooJx0";
    }
    axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
        returnSecureToken: true,
      },
    })
      .then((res) => {
        const expirationTime = new Date(
          new Date().getTime() + +res.data.expiresIn * 1000
        );
        authCtx.login(res.data.idToken, expirationTime.toISOString());
        navigate('/auth/', {replace: true})
      })
      .catch((error) => {
        isLogin
          ? alert("Login Failed!. Please try again after some time.")
          : alert(
              "Account Creation Failed!. Please try again after some time."
            );
      });
  };

  const loginButtonHandler = () => {
    setIsLogin((state) => !state);
  };
  return (
    <Card className={classes.loginCard}>
      <form className={classes.loginForm} onSubmit={submitEventHandler}>
        <div className={classes.title}>Login</div>
        <Input label={"Your Email"} type={"text"} reference={userNameRef} />
        <Input label={"Password"} type={"password"} reference={passwordRef} />
        <button className={classes.loginFormButton} type="submit">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>
      <button
        className={classes.link}
        onClick={loginButtonHandler}
        type="button"
      >
        {isLogin ? "Create a new Account" : "Login with existing account"}
      </button>
    </Card>
  );
};

export default Login;
