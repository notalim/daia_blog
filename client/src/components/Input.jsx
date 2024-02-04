function Input({ placeholder, onChange, value, disabled }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
            className="bg-input-background appearance-none border rounded-lg w-full py-3 px-4 text-input-text border-input-text leading-tight focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        />
    );
}

export default Input;