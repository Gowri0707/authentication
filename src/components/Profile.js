import { useRef, useContext } from "react";
import axios from "axios";
import Input from "./UI/Input"
import classes from "./Profile.module.css";
import AuthContext from "../store/auth-context";

const Profile = () => {
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext);
    const buttonClickHandler = () => {
        console.log("password", passwordRef.current.value, authCtx.idToken)
        axios({
            method: "POST",
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAwEzBM-845UR_bHgRKZHcrinhiClooJx0',
            headers: {
              "Content-Type": "application/json",
            },
            data: {
                idToken: authCtx.idToken,
                password: passwordRef.current.value,
                returnSecureToken: false
            }
          }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log('error', error);
            alert('Password change Failed');
        })
    }
    return (
        <div className={classes.password}>
            <div className={classes.title}>Your User Profile</div>
            <Input className={classes.passwordInput} label={'NewPassword'} type='password' reference={passwordRef} />
            <button onClick={buttonClickHandler}>ChangePassword</button>
        </div>
    )
}

export default Profile