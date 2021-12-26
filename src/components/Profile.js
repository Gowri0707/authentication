import { useRef } from "react";
import Input from "./UI/Input"
import classes from "./Profile.module.css";

const Profile = () => {
    const passwordRef = useRef();
    return (
        <div className={classes.password}>
            <div className={classes.title}>Your User Profile</div>
            <Input className={classes.passwordInput} label={'NewPassword'} type='password' ref={passwordRef} />
            <button>ChangePassword</button>
        </div>
    )
}

export default Profile