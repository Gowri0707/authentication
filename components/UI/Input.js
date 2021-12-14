const Input = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input
            name={props.label}
            type={props.type} 
            />
        </div>
    )
}

export default Input;