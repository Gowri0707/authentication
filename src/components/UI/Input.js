import classes from "./Input.module.css";

const Input = (props) => {
    const styles = classes.input + ' ' + props.className;
    return (
        <div className={styles}>
            <label>{props.label}</label>
            <input
            ref={props.ref}
            name={props.label}
            type={props.type} 
            />
        </div>
    )
}

export default Input;